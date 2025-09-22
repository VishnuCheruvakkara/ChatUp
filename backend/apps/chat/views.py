import logging
from rest_framework.response import Response
from rest_framework.views import APIView
from chat.serializers import ChatRoomSerializer,ChatSerializer
from rest_framework import status
from chat.models import ChatRoom
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q 
from django.shortcuts import get_object_or_404
from chat.swagger_schemas import (
    create_room_schema, get_rooms_schema, delete_room_schema,
    get_single_room_schema, get_messages_schema
)
logger=logging.getLogger(__name__)

class CreateChatRoom(APIView):

    @create_room_schema
    def post(self,request):
        try:
            serializer = ChatRoomSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(created_by = request.user)
                return Response("Chat room created successfully",status=status.HTTP_201_CREATED)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception(f"Error creating chat room:{e}")
            return Response({"error":"Failed to create chat room"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetChatRooms(APIView):
    pagination_class = PageNumberPagination

    @get_rooms_schema
    def get(self,request):
        try:
            mine = request.query_params.get('mine')
            search = request.query_params.get('search','')

            if mine == 'true':
                rooms = ChatRoom.objects.filter(created_by=request.user,is_deleted=False)
            else:
                rooms = ChatRoom.objects.filter(is_deleted=False)

            if search:
                rooms = rooms.filter(
                    Q(name__icontains = search) | (Q(description__icontains=search) | Q(created_by__username__icontains=search))
                )

            paginator = self.pagination_class()
            paginated_rooms = paginator.paginate_queryset(rooms,request)

            serializer = ChatRoomSerializer(paginated_rooms,many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            logger.exception(f"Error fetching chat rooms:{e}")
            return Response({"error":"Failed to fetch chat rooms"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DeleteRoom(APIView):

    @delete_room_schema
    def post(self,request,room_id):
        try:
            room = get_object_or_404(ChatRoom, id=room_id, created_by=request.user)
            room.is_deleted = True
            room.save()
            return Response({"message":"Room deleted successfully"},status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception(f"Error deleting room {room_id}: {e}")
            return Response({"error":"Failed to delete room"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class GetSingleChatRoom(APIView):

    @get_single_room_schema
    def get(self,request,room_id):
        try:
            room = get_object_or_404(ChatRoom, id=room_id)
            serializer = ChatRoomSerializer(room)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception(f"Error fetching room {room_id}: {e}")
            return Response({"error":"Failed to fetch room"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetChatMessages(APIView):

    @get_messages_schema
    def get(self, request, room_id):
        try:
            room = get_object_or_404(ChatRoom,id=room_id)
            chats = room.chats.select_related('user').all()
            serializer = ChatSerializer(chats, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.exception(f"Error fetching messages fro room {room_id} : {e}")
            return Response({"error":"Failed to fetch messages"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
