import os 
import django 

os.environ.setdefault('DJANGO_SETTINGS_MODULE','project_chatup.settings')
django.setup() 

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter 

from apps.chat.routing import chat_urlpatterns
from apps.chat.middleware import JWTAuthMiddleware 

application = ProtocolTypeRouter({
    "http":get_asgi_application(),
    "websocket":JWTAuthMiddleware(
        URLRouter(
            chat_urlpatterns
        )
    ),
})