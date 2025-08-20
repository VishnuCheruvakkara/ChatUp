from rest_framework.test import APITestCase
from django.urls import reverse 
from django.contrib.auth import get_user_model 
from rest_framework import status 
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings 

User = get_user_model()

class RefreshTokenViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="StrongPass123"
        )       

        self.url = reverse("token_refresh_cookie")

    def test_refresh_token_missing(self):
        response = self.client.post(self.url) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["detail"], "Session expired. Please log in again.")

    def test_refresh_token_valid(self):
        refresh_token = RefreshToken.for_user(self.user)

        self.client.cookies[settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"]]=str(refresh_token)

        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "New access token esthablished.")

        access_cookie_name = settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS']
        self.assertIn(access_cookie_name, response.cookies)
        self.assertTrue(response.cookies[access_cookie_name].value)

    def test_refresh_token_invalid(self):
        self.client.cookies[settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']]="invalidtoken"
        response = self.client.post(self.url)
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["detail"],"Session expired. Please log in again.")
                