from rest_framework import serializers 
from django.contrib.auth import get_user_model 
from rest_framework.validators import UniqueValidator
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate 

User = get_user_model()

class RegisterAccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150,validators=[RegexValidator(regex='^[a-zA-Z]+$',message='Username must contain only letters.',code='invalid_username')])
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True,validators=[validate_password])

    class Meta:
        model = User 
        fields = ['username','email','password']

    def create(self,validated_data):
        return User.objects.create_user(**validated_data)
    
class LoginAccountSerializer(serializers.Serializer):
        email = serializers.EmailField()
        password = serializers.CharField(write_only=True)

        def validate(self,data):
            email = data.get("email")
            password = data.get("password")    

            if not email or not password:
                raise serializers.ValidationError("Both email and password are required.")
            
            user = authenticate(email=email,password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password")
            
            data["user"] = user 
            return data 
        
        
        