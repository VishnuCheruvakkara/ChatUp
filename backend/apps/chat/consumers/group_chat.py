import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.models import Chat,ChatRoom
from redis.asyncio import Redis
from django.conf import settings
REDIS_URL = settings.REDIS_URL 

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope.get("user")  # <- important!
        if not self.user or not self.user.is_authenticated:
            await self.close()
            return

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        self.redis_key = f"chat:online_users:{self.room_name}"

        await self.accept()

        # Initialize Redis client
        self.redis = Redis.from_url(REDIS_URL, decode_responses=True)
        await self.add_online_user(self.user.username)  # now self.user exists

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.broadcast_user_list()

    async def disconnect(self, code):
        if self.user:
            await self.remove_online_user(self.user.username)
            

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

        await self.redis.close()
        await self.redis.connection_pool.disconnect()

    async def receive(self,text_data):
        data= json.loads(text_data)
        message = data.get("message")
        user = self.scope["user"]

        chat_obj = await self.save_message(self.room_name,user,message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"chat_message",
                "message":message,
                "username":user.username,
                "user_id":user.id,
                "timestamp": chat_obj.timestamp.isoformat(),
            }
        )

    async def chat_message(self, event):
        await self.send(text_data = json.dumps({
            "message":event["message"],
            "username": event["username"],
            "user_id": event["user_id"],
            "timestamp": event["timestamp"],
        }))

    async def user_list(self, event):
        await self.send(text_data=json.dumps({
            "type":"user_list",
            "users":event["users"],
        }))

    async def add_online_user(self,username):
        await self.redis.hset(self.redis_key, self.user.id, self.user.username)
    
    async def remove_online_user(self,username):
        await self.redis.hdel(self.redis_key, self.user.id)

    async def broadcast_user_list(self):
        users_dict = await self.redis.hgetall(self.redis_key)
        # Convert to list of dicts for frontend
        users = [{"id": k, "username": v} for k, v in users_dict.items()]
        try:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "user_list",
                    "users": users,
                }
            )
        except Exception:
            pass 

    @database_sync_to_async
    def save_message(self, room_name, user, message):
        room = ChatRoom.objects.get(id = room_name)
        return Chat.objects.create(room=room,user=user,message=message)