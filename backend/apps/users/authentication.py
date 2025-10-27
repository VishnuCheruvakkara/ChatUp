from rest_framework_simplejwt.authentication import JWTAuthentication 
from django.conf import settings 
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import exceptions 

class JWTCookieAuthentication(JWTAuthentication):
    """ get access token from cookie for JWT authentication."""
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        if access_token is None:
            return None
        try:
            validated_token = self.get_validated_token(access_token)
        except TokenError as e:
            raise exceptions.AuthenticationFailed(e)
        return self.get_user(validated_token),validated_token
    
