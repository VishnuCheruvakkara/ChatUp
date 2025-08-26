import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


@pytest.mark.django_db
class TestAuthIntegration:

    def setup_method(self):
        """Run before each test"""
        self.client = APIClient()
        self.register_url = reverse("register_account")
        self.login_url = reverse("login_account")
        self.logout_url = reverse("logout_account")
        self.profile_url = reverse("get_user_profile")
        self.refresh_url = reverse("token_refresh_cookie")

    def test_register_and_login_and_profile(self):
        # Register a new user
        register_data = {
            "username": "Sample",
            "email": "sample@gmail.com",
            "password": "Sample@123",
        }
        res = self.client.post(self.register_url, register_data, format="json")
        assert res.status_code == status.HTTP_201_CREATED
        assert "user" in res.data
        assert res.data["user"]["username"] == "Sample"

        # Login with same credentials
        login_data = {
            "email": "sample@gmail.com",
            "password": "Sample@123",
        }
        res = self.client.post(self.login_url, login_data, format="json")
        assert res.status_code == status.HTTP_200_OK
        assert "user" in res.data
        assert res.data["user"]["email"] == "sample@gmail.com"

        # Access user profile with authenticated client
        self.client.cookies = res.cookies  
        res = self.client.get(self.profile_url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data["username"] == "Sample"

    def test_logout(self):
        # Register and login
        self.client.post(self.register_url, {
            "username": "Sample",
            "email": "sample@gmail.com",
            "password": "Sample@123"
        }, format="json")
        res = self.client.post(self.login_url, {
            "email": "sample@gmail.com",
            "password": "Sample@123"
        }, format="json")

        # Logout using session cookies
        self.client.cookies = res.cookies  
        res = self.client.post(self.logout_url)
        assert res.status_code == status.HTTP_200_OK
        assert res.data["message"] == "Logout successful."

    def test_refresh_token(self):
        # Register and login
        self.client.post(self.register_url, {
            "username": "Sample",
            "email": "sample@gmail.com",
            "password": "Sample@123"
        }, format="json")
        res = self.client.post(self.login_url, {
            "email": "sample@gmail.com",
            "password": "Sample@123"
        }, format="json")

        # Call refresh endpoint with cookies
        self.client.cookies = res.cookies  
        res = self.client.post(self.refresh_url)
        assert res.status_code == status.HTTP_200_OK
        assert "New access token esthablished." in res.data["message"]
