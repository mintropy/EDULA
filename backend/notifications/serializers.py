from rest_framework import serializers

from accounts.serializers.user import UserBasicSerializer
from schools.serializers import LectureSerializer
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    from_user = UserBasicSerializer()
    lecture = LectureSerializer()

    class Meta:
        model = Notification
        exclude = ('user',)
