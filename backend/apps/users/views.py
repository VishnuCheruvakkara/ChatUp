from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 
from .serializers import RegisterAccountSerializer

# Create your views here.

class RegisterAccount(APIView):
    def post(self,request):
        serializer = RegisterAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response({"message":"User registered successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginAccount(APIView):
    pass 

class LogoutAccount(APIView):
    pass


