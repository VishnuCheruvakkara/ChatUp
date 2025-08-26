import logging
import os
import sys
from pathlib import Path
import environ 
from datetime import timedelta



env = environ.Env()
environ.Env.read_env() 

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env.read_env(os.path.join(BASE_DIR,'.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG',default=True)

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

# path to all apps that are inside the common 'apps' folder.
APPS_DIR = BASE_DIR / 'apps'
sys.path.insert(0, str(APPS_DIR))

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Custom apps 
    'users',
    'chat',
    # Third party apps 
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    'channels',
    'drf_spectacular',
]


REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'apps.users.authentication.JWTCookieAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 6,
}

CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS")

CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS")

CORS_ALLOW_CREDENTIALS = True

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=10),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=2),
    'BLACKLIST_AFTER_ROTATION': True,
    'ROTATE_REFRESH_TOKENS': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_COOKIE_ACCESS': 'access_token',         # Custom
    'AUTH_COOKIE_REFRESH': 'refresh_token',       # Custom
    'AUTH_COOKIE_HTTP_ONLY': True,
    'AUTH_COOKIE_SECURE': True,          
    'AUTH_COOKIE_SAMESITE': 'None',
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project_chatup.urls'
AUTH_USER_MODEL =  'users.User'

REDIS_URL = env('REDIS_URL')

CHANNEL_LAYERS = {
    "default":{
        "BACKEND":"channels_redis.core.RedisChannelLayer",
        "CONFIG":{
            "hosts": [REDIS_URL],
        }
    }
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project_chatup.wsgi.application'
ASGI_APPLICATION = 'project_chatup.asgi.application'

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    "default": env.db("DATABASE_URL"),
}

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Logger setup for debug in both production and development
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'ChatUp',
    'DESCRIPTION': """
# ChatUp REST API (Backend)

**ChatUp** is a real-time chat application backend. This API allows users to register, login, create chat rooms, and send messages securely using JWT authentication.

## Key Features
- **User Authentication:** Register, login, logout, and get profile info.
- **Chat Rooms:** Create, list, search, and delete chat rooms.
- **Messages:** Send and retrieve messages in chat rooms.
- **Pagination & Filtering:** Supports pagination and search on chat rooms.

## Authentication
- JWT access and refresh tokens are used.
- Use the **Authorize** button in Swagger UI to access protected endpoints.

## Real-Time Chat (WebSocket)
- **Connect:** `ws://localhost:8000/ws/chat-room/<room_name>/`
- **Authentication:** User must be logged in (JWT or session cookie)
- **Events:**
  - `message`: Send a message  
    **Payload:** `{ "message": "<text>" }`
  - `user_list`: Receive current online users
- **Notes:** Messages are broadcast to all users in the room. Online users are tracked in Redis.

## Developer Info
- GitHub: [https://github.com/VishnuCheruvakkara](https://github.com/VishnuCheruvakkara)  
- LinkedIn: [https://www.linkedin.com/in/vishnu-cheruvakkara-231b8b235/](https://www.linkedin.com/in/vishnu-cheruvakkara-231b8b235/)  
- Instagram: [https://www.instagram.com/vishnu_c_dev/](https://www.instagram.com/vishnu_c_dev/)  

**API Version:** v1.0.0  
All responses are in JSON format.
""",
    'VERSION': '1.0.0',
    'CONTACT': {
        "name": "Author",
        "email": "vishnucheruvakkaraofficial@gmail.com",
    },
    'LICENSE': {
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT"
    },
}
