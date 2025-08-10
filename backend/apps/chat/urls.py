from django.urls import path
from .views import CreateChatRoom,GetChatRooms

urlpatterns = [
    path('create-chat-room/',CreateChatRoom.as_view(),name="create_chatroomt"),
    path('get-all-rooms/',GetChatRooms.as_view(),name='get_all_rooms')
]