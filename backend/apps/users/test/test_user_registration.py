from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()

class UserRegistrationTest(APITestCase):
    # Test sample
    def test_register_user_success(self):
        response = self.client.post(reverse("register_account"), {
            "username": "vishnu",
            "email": "vishnu@example.com",
            "password": "Strong@123"
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    # Test valid emails
    def test_register_user_valid_email(self):
        valid_emails = [
            "vishnu@gmail.com",
            "test.user@domain.in",
            "hello@company.org",
        ]
        for i, email in enumerate(valid_emails):
            response = self.client.post(reverse("register_account"), {
                "username": f"vishnu{i}",
                "email": email,
                "password": "Strong@123"
            }, format="json")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Test invalid emails
    def test_register_invalid_emails(self):
        invalid_emails = [
            "notanemail",
            "test@.com",
            "hello@domain",
            "@missingname.com"
        ]
        for email in invalid_emails:
            response = self.client.post(reverse("register_account"), {
                "username": "user2",
                "email": email,
                "password": "Strong@123",
            }, format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Test duplicate email
    def test_register_duplicate_email(self):
        User.objects.create_user(username="v1", email="vishnu@example.com", password="StrongPass123")
        response = self.client.post(reverse("register_account"), {
            "username": "v2",
            "email": "vishnu@example.com",
            "password": "Strong@123",
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Test duplicate username
    def test_register_duplicate_username(self):
        User.objects.create_user(username="vishnu", email="vishnu@example.com", password="Strong@123")
        response = self.client.post(reverse("register_account"), {
            "username": "vishnu",
            "email": "vishnu12@example.com",
            "password": "Strong3@123",
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Test valid passwords
    def test_register_valid_password(self):
        valid_passwords = [
            "Sample@123",
            "Sample@$$1212",
            "2112$$@sdfdEEE",
        ]
        for i, password in enumerate(valid_passwords):
            response = self.client.post(reverse("register_account"), {
                "username": f"vishnu{i}",
                "email": f"Sample{i}@gmail.com",
                "password": password
            }, format="json")
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Test invalid passwords
    def test_register_invalid_password(self):
        invalid_passwords = [
            "Sample",
            "12121212",
            "sdfsdfsdf#",
            "@!#$@!#!@#",
            "Sample123",
            "password",
        ]
        for i, password in enumerate(invalid_passwords):
            response = self.client.post(reverse("register_account"), {
                "username": f"vishnu{i}",
                "email": f"Sample{i}@gmail.com",
                "password": password
            }, format="json")
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
