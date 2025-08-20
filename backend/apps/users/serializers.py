from rest_framework import serializers 
from django.contrib.auth import get_user_model 
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate 

User = get_user_model()

class RegisterAccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150,validators=[RegexValidator(regex=r'^(?=.*[A-Za-z])[A-Za-z0-9_]+$',message='Username is not valid',code='invalid_username')])
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True,validators=[validate_password,RegexValidator(regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',message='Password must be at least 8 characters long and contain one uppercase, one lowercase, one number, and one special character.')])

    class Meta:
        model = User 
        fields = ['username','email','password']

    def validate(self,attrs):
        username = attrs.get('username')
        email = attrs.get('email')

        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email or username already taken.")

        return attrs
    
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
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id','username','email']
        
        
        