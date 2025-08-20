from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from chat.models import ChatRoom, Chat

User = get_user_model()

class GetChatMessagesTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.room = ChatRoom.objects.create(name="Test Room", created_by=self.user)
        self.chat1 = Chat.objects.create(room=self.room, user=self.user, message="Hello")
        self.chat2 = Chat.objects.create(room=self.room, user=self.user, message="Hi again")
        self.url = reverse("get_chat_messages", args=[self.room.id])

    def test_get_chat_messages_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["user"], self.user.username)
        self.assertEqual(response.data[0]["userId"], self.user.id)
        self.assertIn("text", response.data[0])
        self.assertIn("time", response.data[0])

    def test_get_chat_messages_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_chat_messages_invalid_room(self):
        self.client.force_authenticate(user=self.user)
        url = reverse("get_chat_messages", args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
