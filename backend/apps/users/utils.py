from rest_framework_simplejwt.tokens import RefreshToken 
from django.conf import settings 

def set_jwt_cookies(response,user):
    """Unitlity for set jwt token in cookies"""

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # Set access token in cookie 
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
        value=access_token,
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
    )

    # Set refresh token in cookie 
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
        value=str(refresh),
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        secure=settings.SIMPLE_JWT['AUTH-COOKIE_SECURE'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
    )

    return response


   