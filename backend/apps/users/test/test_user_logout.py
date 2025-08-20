from rest_framework.test import APITestCase 
from django.urls import reverse 

class LogoutAccountTest(APITestCase):
    def setUp(self):
        self.url = reverse("logout_account")

    def test_logout_success(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["message"], "Logout successful.")

        access_cookie = response.cookies.get("access_token")
        refresh_cookie = response.cookies.get("refresh_token")

        self.assertIsNotNone(access_cookie)
        self.assertEqual(access_cookie.value, "")  

        self.assertIsNotNone(refresh_cookie)
        self.assertEqual(refresh_cookie.value, "") 

