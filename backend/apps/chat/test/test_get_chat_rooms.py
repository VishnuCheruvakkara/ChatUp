from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from chat.models import ChatRoom

User = get_user_model()

class GetChatRoomsTests(APITestCase):

    def setUp(self):
        self.url = reverse("get_all_rooms")

        # Create users
        self.user1 = User.objects.create_user(
            username="alice",
            email="alice@example.com",
            password="password123"
        )
        self.user2 = User.objects.create_user(
            username="bob",
            email="bob@example.com",
            password="password123"
        )

        # Create chat rooms
        self.room1 = ChatRoom.objects.create(
            name="Tech Talk",
            description="Room for tech discussions",
            created_by=self.user1
        )
        self.room2 = ChatRoom.objects.create(
            name="Gaming Zone",
            description="Room for gamers",
            created_by=self.user2
        )
        self.room3 = ChatRoom.objects.create(
            name="Study Group",
            description="Math study group",
            created_by=self.user1,
            is_deleted=True 
        )

    def test_get_all_rooms(self):
        """Should return all non-deleted rooms"""
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = response.data["results"]
        self.assertEqual(len(results), 2)  # room1 + room2
        names = [room["name"] for room in results]
        self.assertIn("Tech Talk", names)
        self.assertIn("Gaming Zone", names)
        self.assertNotIn("Study Group", names)

    def test_get_my_rooms_only(self):
        """Should return only rooms created by the logged-in user when mine=true"""
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url, {"mine": "true"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = response.data["results"]
        self.assertEqual(len(results), 1)  # only room1
        self.assertEqual(results[0]["name"], "Tech Talk")

    def test_search_rooms_by_name(self):
        """Should filter rooms by search keyword in name"""
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url, {"search": "Gaming"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = response.data["results"]
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["name"], "Gaming Zone")

    def test_search_rooms_by_description(self):
        """Should filter rooms by search keyword in description"""
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url, {"search": "tech"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = response.data["results"]
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["name"], "Tech Talk")

    def test_pagination_limit(self):
        """Should respect pagination (page size = 1 for testing)"""
        self.client.force_authenticate(user=self.user1)

        response = self.client.get(self.url, {"page": 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Should have "results" and pagination metadata
        self.assertIn("results", response.data)
        self.assertIn("count", response.data)
