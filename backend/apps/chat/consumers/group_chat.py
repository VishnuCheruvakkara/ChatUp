import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from chat.models import Chat,ChatRoom

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user= self.scope.get("user")
        if not user or not user.is_authenticated:
            await self.close()
            return 
        
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

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

    @database_sync_to_async
    def save_message(self, room_name, user, message):
        room = ChatRoom.objects.get(id = room_name)
        return Chat.objects.create(room=room,user=user,message=message)