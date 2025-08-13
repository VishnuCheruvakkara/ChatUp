import json
from channels.generic.websocket import AsyncWebsocketConsumer

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
        username = user.username if user else "Anonymous"

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"chat_message",
                "message":message,
                "username":username,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data = json.dumps({
            "message":event["message"],
            "username": event["username"],
        }))