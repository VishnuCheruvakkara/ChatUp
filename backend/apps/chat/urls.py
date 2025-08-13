from django.urls import path
from .views import CreateChatRoom,GetChatRooms,DeleteRoom,GetSingleChatRoom

urlpatterns = [
    path('create-chat-room/',CreateChatRoom.as_view(),name="create_chatroom"),
    path('get-all-rooms/',GetChatRooms.as_view(),name='get_all_rooms'),
    path('delete-room/<int:room_id>/',DeleteRoom.as_view(),name="delete_room"),
    path('get-chat-room/<int:room_id>',GetSingleChatRoom.as_view(),name="get_single_chatroom")
]