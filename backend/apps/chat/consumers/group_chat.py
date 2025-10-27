import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.models import Chat,ChatRoom
from redis.asyncio import Redis
from django.conf import settings
REDIS_URL = settings.REDIS_URL 
logger = logging.getLogger(__name__)

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope.get("user")  
        if not self.user or not self.user.is_authenticated:
            await self.close()
            return

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"
        self.redis_key = f"chat:online_users:{self.room_name}"

        await self.accept()
        try:
            # Initialize Redis client
            self.redis = Redis.from_url(REDIS_URL, decode_responses=True)
            await self.add_online_user(self.user.username)  # now self.user exists

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name,
            )
            await self.broadcast_user_list()
            logger.info(f"User {self.user.username} connect to room {self.room_name}")
        except Exception as e:
            logger.error(f"Websocket connect error for user {self.user.username} : {e}")
            await self.close()
            

    async def disconnect(self, code):
        try:
            if self.user:
                await self.remove_online_user(self.user.username)
                await self.broadcast_user_list()
            
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )
        except Exception as e:
            logger.error(f"Websocket disconnect error for user {self.user.username} : {e}")
        finally:
            if hasattr(self,'redis'):
                try:
                    await self.redis.aclose()
                    await self.redis.connection_pool.disconnect()
                except Exception as e:
                    logger.warning(f"Redis diconnect error : {e}")

    async def receive(self,text_data):
        try:
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
        except Exception as e:
            logger.error(f"Error processing message from user {self.user.username} : {e}")

    async def chat_message(self, event):
        try:
            await self.send(text_data = json.dumps({
                "message":event["message"],
                "username": event["username"],
                "user_id": event["user_id"],
                "timestamp": event["timestamp"],
            }))
        except Exception as e:
            logger.error(f"Error sending chat message to user {self.user.username} : {e}")

    async def user_list(self, event):
        try:
            await self.send(text_data=json.dumps({
                "type":"user_list",
                "users":event["users"],
            }))
        except Exception as e:
            logger.error(f"Error sending user list to user {self.user.username} : {e}")
            
    async def add_online_user(self,username):
        try:
            await self.redis.hset(self.redis_key, self.user.id, self.user.username)
        except Exception as e:
            logger.warning(f"Redis add_online_user error for {username} : {e}")
   
    async def remove_online_user(self,username):
        try:
            await self.redis.hdel(self.redis_key, self.user.id)
        except Exception as e:
            logger.warning(f"Redis remove_online_user error for {username} : {e}")

    async def broadcast_user_list(self):
        try:
            users_dict = await self.redis.hgetall(self.redis_key)
            # Convert to list of dicts for frontend
            users = [{"id": k, "username": v} for k, v in users_dict.items()]
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "user_list",
                    "users": users,
                }
            )
        except Exception as e:
            logger.warning(f"Error broadcasting list in room {self.room_name} : {e}")

    @database_sync_to_async
    def save_message(self, room_name, user, message):
        try:
            room = ChatRoom.objects.get(id = room_name)
            return Chat.objects.create(room=room,user=user,message=message)
        except Exception as e:
            logger.error(f"Error saving message for user {user.username} : {e}")
            raise