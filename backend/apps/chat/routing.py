from django.urls import re_path 
from apps.chat.consumers.group_chat import ChatRoomConsumer

chat_urlpatterns = [
    re_path(r"ws/chat-room/(?P<room_name>\w+)/$",ChatRoomConsumer.as_asgi())
]