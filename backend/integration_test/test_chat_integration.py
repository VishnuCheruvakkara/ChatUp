import pytest
from django.urls import reverse, re_path
from rest_framework import status
from rest_framework.test import APIClient

from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from asgiref.sync import sync_to_async
from django.test import override_settings
from django.contrib.auth import get_user_model

from chat.consumers.group_chat import ChatRoomConsumer
from chat.models import ChatRoom

User = get_user_model()

# In-memory channel layer for WebSocket tests
TEST_CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}


@pytest.mark.django_db
class TestChatIntegration:

    def setup_method(self):
        """Setup before each test"""
        self.client = APIClient()
        self.create_room_url = reverse("create_chatroom")
        self.get_rooms_url = reverse("get_all_rooms")

    def authenticate_user(self, username="Sample", email="sample@gmail.com", password="Sample@123"):
        """Helper: register + login + set cookies"""
        register_url = reverse("register_account")
        login_url = reverse("login_account")

        # Register
        self.client.post(register_url, {
            "username": username,
            "email": email,
            "password": password
        }, format="json")

        # Login
        res = self.client.post(login_url, {
            "email": email,
            "password": password
        }, format="json")

        # Save auth cookies
        self.client.cookies = res.cookies
        return res

    def test_create_and_get_chat_room(self):
        # Authenticate
        self.authenticate_user()

        # Create room
        room_data = {"name": "Test Room", "description": "Integration test room"}
        res = self.client.post(self.create_room_url, room_data, format="json")
        assert res.status_code == status.HTTP_201_CREATED
        assert "Chat room created successfully" in res.data

        # Get rooms
        res = self.client.get(self.get_rooms_url)
        assert res.status_code == status.HTTP_200_OK
        assert any(room["name"] == "Test Room" for room in res.data["results"])

    def test_delete_chat_room(self):
        # Authenticate
        self.authenticate_user()

        # Create a room 
        res = self.client.post(self.create_room_url, {
            "name": "Delete Room",
            "description": "Room to be deleted"
        }, format="json")
        assert res.status_code == status.HTTP_201_CREATED

        # Fetch created room ID
        res_rooms = self.client.get(self.get_rooms_url)
        room_id = res_rooms.data["results"][0]["id"]

        # Delete it
        delete_url = reverse("delete_room", args=[room_id])
        res = self.client.post(delete_url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data["message"] == "Room deleted successfully"

    def test_get_single_chat_room(self):
        # Authenticate
        self.authenticate_user()

        # Create a room 
        self.client.post(self.create_room_url, {
            "name": "Single Room",
            "description": "Room for single fetch testing"
        }, format="json")

        # Fetch rooms and get ID
        res_rooms = self.client.get(self.get_rooms_url)
        room_id = res_rooms.data["results"][0]["id"]

        # Get single room
        single_url = reverse("get_single_chatroom", args=[room_id])
        res = self.client.get(single_url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data["name"] == "Single Room"


# Real-time WebSocket Tests

@override_settings(CHANNEL_LAYERS=TEST_CHANNEL_LAYERS)
@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_chatroom_consumer_authenticated():
    user = await sync_to_async(User.objects.create_user)(
        username="Sample", email="sample@gmail.com", password="Sample@123"
    )
    room = await sync_to_async(ChatRoom.objects.create)(
        name="Realtime Room", description="Room for realtime testing", created_by=user
    )

    # Use URLRouter for consumer
    application = URLRouter([
        re_path(r"ws/chat-room/(?P<room_name>[0-9]+)/$", ChatRoomConsumer.as_asgi()),
    ])

    communicator = WebsocketCommunicator(application, f"/ws/chat-room/{room.id}/")
    communicator.scope["user"] = user  # Inject authenticated user

    connected, _ = await communicator.connect()
    assert connected is True

    # Send a chat message
    await communicator.send_json_to({"message": "Hello Realtime!"})

    # Wait until we get the message back
    while True:
        response = await communicator.receive_json_from()
        if "message" in response:
            break

    assert response["message"] == "Hello Realtime!"
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
    communicator.scope["user"] = None  # No authentication

    connected, _ = await communicator.connect()
    assert connected is False
