from rest_framework import serializers

from ..models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FriendRequest
        fields = '__all__'
        read_only_fields = ('from_user', 'to_user',)
