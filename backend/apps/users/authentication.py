from rest_framework_simplejwt.authentication import JWTAuthentication 
from django.conf import settings 


class JWTCookieAuthentication(JWTAuthentication):
    """ get access token from cookie for JWT authentication."""
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
        if access_token is None:
            return None
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token),validated_token
    
