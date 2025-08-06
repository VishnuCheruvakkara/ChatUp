from rest_framework_simplejwt.tokens import RefreshToken, TokenError
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
        max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
    )

    # Set refresh token in cookie 
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
        value=str(refresh),
        httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())
    )

    return response

def clear_jwt_cookies(response,request=None):
    if request:
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if refresh_token:
            try:
                token = RefreshToken(refresh_token) 
                token.blacklist()
            except TokenError:
                pass
    response.delete_cookies(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'])
    response.delete_cookies(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
    return response 

   