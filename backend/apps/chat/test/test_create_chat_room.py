from django.urls import reverse 
from rest_framework.test import APITestCase
from rest_framework import status 
from django.contrib.auth import get_user_model 
from chat.models import ChatRoom

User = get_user_model()

class CreateChatRoomTest(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email = "testuser@example.com",
            username="testuser",
            password = "Strong@123",
        )
        self.url = reverse("create_chatroom")

    def test_create_chat_room_success(self):
        self.client.force_authenticate(user=self.user)

        payload = {
            "name":"Tech Room",
            "description": "This is a cool chat room",
        }

        response = self.client.post(self.url,payload,format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, "Chat room created successfully")
        self.assertEqual(ChatRoom.objects.count(),1)
        room=ChatRoom.objects.first()
        self.assertEqual(room.name,"Tech Room")
        self.assertEqual(room.created_by, self.user)

    def test_create_chat_room_without_authentication(self):
        payload = {
            "name":"Gaming Zone",
            "description":"Fun chat room"
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(ChatRoom.objects.count(),0)

    def test_create_chat_room_invalid_name(self):
        self.client.force_authenticate(user=self.user)

        payload = {
            "name":"1234234",
            "description":"Valid description"
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)
        self.assertEqual(ChatRoom.objects.count(),0)

    def test_create_chat_room_invalid_description(self):
        self.client.force_authenticate(user=self.user)

        payload = {
            "name":"ValidName",
            "description":"1232323",
        }

        response = self.client.post(self.url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("description",response.data)
        self.assertEqual(ChatRoom.objects.count(),0)