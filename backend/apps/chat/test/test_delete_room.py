from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from chat.models import ChatRoom

User = get_user_model()

class DeleteRoomTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="test@123")
        self.room = ChatRoom.objects.create(name="Test Room", created_by=self.user)
        self.url = reverse("delete_room", args=[self.room.id])

        refresh = RefreshToken.for_user(self.user)
        self.client.cookies[settings.SIMPLE_JWT["AUTH_COOKIE_ACCESS"]] = str(refresh.access_token)
        self.client.cookies[settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"]] = str(refresh)

    def test_delete_room_success(self):
        response = self.client.post(self.url)
        self.room.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.room.is_deleted)

    def test_delete_room_not_found(self):
        url = reverse("delete_room", args=[999])
        response = self.client.post(url)
        self.assertEqual(response.status_code, 404)
