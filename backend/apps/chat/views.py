from rest_framework.response import Response
from rest_framework.views import APIView
from chat.serializers import ChatRoomSerializer
from rest_framework import status
from chat.models import ChatRoom

class CreateChatRoom(APIView):
    def post(self,request):
        serializer = ChatRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by = request.user)
            return Response("Chat room created successfully",status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class GetChatRooms(APIView):
    def get(self,request):
        mine = request.query_params.get('mine')
        if mine == 'true':
            rooms = ChatRoom.objects.filter(created_by=request.user)
        else:
            rooms = ChatRoom.objects.all()
        serializer = ChatRoomSerializer(rooms,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)