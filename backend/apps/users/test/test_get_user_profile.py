from rest_framework.test import APITestCase 
from django.urls import reverse 
from django.contrib.auth import get_user_model 
from rest_framework import status 

User = get_user_model() 

class GetUserProfileTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="Sample@123",
        )
        self.url = reverse("get_user_profile")

    def test_get_user_profile_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data["email"], self.user.email)
        self.assertEqual(response.data["username"], self.user.username)

    def test_get_user_profile_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
