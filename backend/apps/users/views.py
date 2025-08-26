import logging
from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 
from .serializers import RegisterAccountSerializer,LoginAccountSerializer,UserSerializer
from .utils import set_jwt_cookies,clear_jwt_cookies
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
logger = logging.getLogger(__name__)
from .swagger_schemas import register_schema, login_schema, logout_schema, profile_schema, refresh_schema


class RegisterAccount(APIView):
    permission_classes = [AllowAny]

    @register_schema
    def post(self,request):
        serializer = RegisterAccountSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            user_data = UserSerializer(user).data
            response = Response({"message":"User registered successfully","user":user_data},status=status.HTTP_201_CREATED)
            # Call function from utils.py
            return set_jwt_cookies(response, user)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginAccount(APIView):
    permission_classes=[AllowAny]

    @login_schema
    def post(self, request):
        serializer = LoginAccountSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            user_data = UserSerializer(user).data
            response = Response({"message":"Login successfull","user":user_data},status=status.HTTP_200_OK)
            # Call function from utils.py
            return set_jwt_cookies(response, user)
        else:
            return Response(serializer.errors,status = status.HTTP_401_UNAUTHORIZED)

class LogoutAccount(APIView):
    permission_classes=[AllowAny]

    @logout_schema
    def post(self,request):
        response = Response({"message":"Logout successful."},status=status.HTTP_200_OK)    
        return clear_jwt_cookies(response,request)
    
class GetUserProfile(APIView):

    @profile_schema
    def get(self,request):
        user = request.user 
        serializer = UserSerializer(user)
        return Response(serializer.data)

class RefreshTokenView(APIView):
    """ Generate new access token with refresh token if access token is expired."""
    permission_classes = [AllowAny]

    @refresh_schema
    def post(self,request):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])

        if refresh_token is None:
            return Response({"detail":"Session expired. Please log in again."},status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            token = RefreshToken(refresh_token)
            access_token = str(token.access_token)

            response = Response({"message":"New access token esthablished."},status=status.HTTP_200_OK)

            # Set access token in cookie 
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access_token,
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
            )

            return response 
        except TokenError as e:
            return Response({"detail":"Session expired. Please log in again."},status=status.HTTP_401_UNAUTHORIZED)

