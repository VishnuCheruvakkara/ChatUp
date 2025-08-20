from django.urls import reverse 
from django.contrib.auth import get_user_model 
from rest_framework.test import APITestCase
from rest_framework import status 

User = get_user_model() 

class LoginAccountTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="active@example.com",
            username = "activeuser",
            password = "Sample@123",
            is_active = True,
        )

        self.inactive_user = User.objects.create_user(
            email = "inactive@example.com",
            username="inactiveuser",
            password="Sample@123",
            is_active = False,
        )
        self.login_url = reverse("login_account")

    def test_login_valid_user(self):
        """"Login with valid credential should return JWT cookies"""
        response = self.client.post(self.login_url,{
            "email":"active@example.com",
            "password":"Sample@123"
        },format="json")

        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertIn("access_token", response.cookies)
        self.assertIn("refresh_token", response.cookies)
        self.assertEqual(response.data["message"], "Login successfull")
        self.assertEqual(response.data["user"]["email"], "active@example.com")

    def test_login_invalid_password(self):
        response = self.client.post(self.login_url,{
            "email":"active@example.com",
            "password":"WrongPass"
        },format="json")
        
        self.assertEqual(response.status_code,status.HTTP_401_UNAUTHORIZED)

    def test_login_invalid_email(self):
        response = self.client.post(self.login_url,{
            "email":"nouser@example.com",
            "password":"Strong@123"
        },format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_inactive_user(self):
        response = self.client.post(self.login_url,{
            "email":"incative@example.com",
            "password":"Strong@123",
        },format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        