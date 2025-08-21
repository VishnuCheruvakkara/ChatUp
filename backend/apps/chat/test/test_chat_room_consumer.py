import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from channels.routing import URLRouter
from django.urls import re_path
from asgiref.sync import sync_to_async
from django.test import override_settings
from chat.consumers.group_chat import ChatRoomConsumer
from chat.models import ChatRoom

User = get_user_model()

TEST_CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}

@override_settings(CHANNEL_LAYERS=TEST_CHANNEL_LAYERS)
@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_chatroom_consumer_authenticated():
    user = await sync_to_async(User.objects.create_user)(
        username="testuser", email="testuser@example.com", password="Sample@2024"
    )
    room = await sync_to_async(ChatRoom.objects.create)(
        name="Test Room", description="This is a test room", created_by=user
    )

    # Use URLRouter only
    application = URLRouter([
        re_path(r"ws/chat-room/(?P<room_name>[0-9]+)/$", ChatRoomConsumer.as_asgi()),
    ])

    communicator = WebsocketCommunicator(application, f"/ws/chat-room/{room.id}/")
    communicator.scope["user"] = user  # Inject user

    connected, _ = await communicator.connect()
    assert connected is True

    await communicator.send_json_to({"message": "Hello World!"})

    # Wait until we get the message
    while True:
        response = await communicator.receive_json_from()
        if "message" in response:
            break

    assert response["message"] == "Hello World!"
    assert response["username"] == user.username

    await communicator.disconnect()

@override_settings(CHANNEL_LAYERS=TEST_CHANNEL_LAYERS)
@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_chatroom_consumer_unauthenticated():
    creator = await sync_to_async(User.objects.create_user)(
        username="creator", email="creator@example.com", password="123"
    )
    room = await sync_to_async(ChatRoom.objects.create)(
        name="Another Room", description="desc", created_by=creator
    )

    application = URLRouter([
        re_path(r"ws/chat-room/(?P<room_name>[0-9]+)/$", ChatRoomConsumer.as_asgi()),
    ])

    communicator = WebsocketCommunicator(application, f"/ws/chat-room/{room.id}/")
    communicator.scope["user"] = None

    connected, _ = await communicator.connect()
    assert connected is False
