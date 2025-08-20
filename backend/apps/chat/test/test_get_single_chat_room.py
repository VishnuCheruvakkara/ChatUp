from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from chat.models import ChatRoom

User = get_user_model()

class GetSingleChatRoomTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="Test@123")
        self.room = ChatRoom.objects.create(
            name="Test Room",
            description="Test Description",
            created_by=self.user
        )
        self.url = reverse("get_single_chatroom", args=[self.room.id])
        self.client.force_authenticate(user=self.user)

    def test_get_single_chatroom_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.room.id)
        self.assertEqual(response.data["name"], self.room.name)
        self.assertEqual(response.data["description"], self.room.description)
        self.assertEqual(response.data["creator_name"], self.user.username)
        self.assertEqual(int(response.data["creator_id"]), self.user.id)

    def test_get_single_chatroom_not_found(self):
        url = reverse("get_single_chatroom", args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
