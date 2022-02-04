from rest_framework import serializers

from ..models import FriendRequest
from .user import UserBasicSerializer

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user_detail = UserBasicSerializer(read_only=True)
    to_user_detail = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = FriendRequest
        fields = (
            'id', 'from_user', 'to_user', 'request_status',
            'from_user_detail', 'to_user_detail',
        )
        write_only_fields = ('from_user', 'to_user', 'request_status',)
