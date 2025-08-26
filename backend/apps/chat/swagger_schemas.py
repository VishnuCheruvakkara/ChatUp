from drf_spectacular.utils import extend_schema, OpenApiExample
from .serializers import ChatRoomSerializer, ChatSerializer

# Create Chat Room
create_room_schema = extend_schema(
    summary="Create a new chat room",
    description="Create a new chat room. The logged-in user is automatically set as the creator.",
    request=ChatRoomSerializer,
    responses={201: None, 400: None},
    examples=[
        OpenApiExample(
            "Example Request",
            value={"name": "General", "description": "General discussion room"},
            request_only=True
        )
    ],
    tags=['Chat Rooms'],
)

# Get Chat Rooms 
get_rooms_schema = extend_schema(
    summary="Get all chat rooms",
    description="""
Retrieve all chat rooms. Use query params:
- `mine=true` to get rooms created by current user
- `search=<text>` to search by name, description, or creator's username
""",
    responses={200: ChatRoomSerializer(many=True)},
    tags=['Chat Rooms'],
)

# Delete Chat Room
delete_room_schema = extend_schema(
    summary="Delete a chat room",
    description="Marks the chat room as deleted. Only the creator can delete it.",
    responses={200: None, 404: None},
    tags=['Chat Rooms'],
)

# Get Single Chat Room 
get_single_room_schema = extend_schema(
    summary="Get single chat room details",
    description="Retrieve details of a specific chat room by ID.",
    responses={200: ChatRoomSerializer, 404: None},
    tags=['Chat Rooms'],
)

# Get Chat Messages
get_messages_schema = extend_schema(
    summary="Get all messages in a chat room",
    description="Retrieve all messages in a specific chat room by room ID.",
    responses={200: ChatSerializer(many=True), 404: None},
    tags=['Chats'],
)
