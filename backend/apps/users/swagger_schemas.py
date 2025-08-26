from drf_spectacular.utils import extend_schema, OpenApiExample
from .serializers import RegisterAccountSerializer, UserSerializer, LoginAccountSerializer

# Registration endpoint documentation
register_schema = extend_schema(
    summary="Register a new user",
    description="""
Register a new user with email, username, and password.
On successful registration, JWT cookies (access & refresh) will be set in the response.
""",
    request=RegisterAccountSerializer,
    responses={
        201: UserSerializer, 
        400: None,            
    },
    examples=[
        OpenApiExample(
            "Example Request",
            value={
                "email": "Sample@gmail.com",
                "username": "UserSample",
                "password": "StrongPassword@123"
            },
            request_only=True,
        )
    ],
    tags=['Authentication'],
)

#Login end point
login_schema = extend_schema(
    summary="Login user",
    description="Login with email and password. JWT cookies are set on success.",
    request=LoginAccountSerializer,
    responses={
        200: UserSerializer,
        401: None
    },
    examples=[
        OpenApiExample(
            "Example Login",
            value={"email": "user@example.com", "password": "strongpassword123"},
            request_only=True
        )
    ],
    tags=['Authentication'],
)

#logout end point 
logout_schema = extend_schema(
    summary="Logout user",
    description="Logs out the user and clears JWT cookies.",
    responses={200: None},
    tags=['Authentication'],
)

# Get user end point 
profile_schema = extend_schema(
    summary="Get current user profile",
    description="Retrieve the currently logged-in user's profile data.",
    responses={200: UserSerializer},
    tags=['Users'],
)

# Refresh token 
refresh_schema = extend_schema(
    summary="Refresh access token",
    description="""
Generate a new access token using the refresh token stored in cookies.

Responses:
    200: New access token established and set in cookie.
    401: Session expired or refresh token missing/invalid.
""",
    responses={200: None, 401: None},
    tags=['Authentication'],
)
