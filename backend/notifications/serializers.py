from rest_framework import serializers

from accounts.serializers.user import UserBasicSerializer
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    from_user = UserBasicSerializer()

    class Meta:
        model = Notification
        exclude = ('user',)
