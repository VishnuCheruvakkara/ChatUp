from django.contrib.auth import get_user_model 
from django.db import models
User = get_user_model()

class ChatRoom(models.Model):
    name = models.CharField(max_length=25,unique=True)
    description = models.TextField()
    created_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name='rooms')
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-created_at']

class Chat(models.Model):
    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE,related_name="chats")
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="chats")
    message = models.TextField(blank=False,null=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} in {self.room}: {self.message[:20]}"