from rest_framework import serializers
from chat.models import ChatRoom
from django.core.validators import RegexValidator

class ChatRoomSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(source="created_by.username",read_only=True)
    name = serializers.CharField(max_length=25,validators=[RegexValidator(regex=r'^(?=.*[A-Za-z])[A-Za-z0-9_ ]+$',message='Name must contain letters and can only include letters, numbers, underscores, and spaces.')])
    description = serializers.CharField(max_length=250,required=True,validators = [RegexValidator(regex=r'^(?=.*[A-Za-z])[A-Za-z0-9_ ]+$',message='Description must contain letters and can only include letters, numbers, underscores, and spaces')])
    class Meta:
        model=ChatRoom
        fields = ['id','name','description','created_at','creator_name']

    
  