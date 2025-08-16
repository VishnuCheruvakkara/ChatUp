import logging
import jwt 
from django.conf import settings 
from channels.middleware import BaseMiddleware 
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model 

User = get_user_model() 
logger = logging.getLogger(__name__)

@database_sync_to_async
def get_user_from_token(token):
    try:
        payload = jwt.decode(token,settings.SECRET_KEY,algorithms=["HS256"])
        return User.objects.get(id=payload["user_id"])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return None 
    
class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope,receive, send):
        headers = dict(scope["headers"])

        cookies = {}
        if b"cookie" in headers:
            cookie_str = headers[b"cookie"].decode() 
            for pair in cookie_str.split(";"):
                name, value = pair.strip().split("=",1)
                cookies[name] = value 

        token = cookies.get("access_token") 

        scope["user"] = await get_user_from_token(token) if token else None 

        return await super().__call__(scope, receive, send)