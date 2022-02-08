from rest_framework import serializers

from ..models import SchoolAdmin
from .user import UserBasicSerializer, UserDetailSerializer
from schools.serializers import (
    SchoolSerializer, LectureSerializer, ClassroomSerializer
)

class SchoolAdminSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    classroom = ClassroomSerializer(read_only=True)
    school = SchoolSerializer(read_only=True)
    
    class Meta:
        model = SchoolAdmin
        fields = '__all__'
    
    def update(self, instance, validated_data):
        if 'user' in validated_data:
            nested_serializer = self.fields['user']
            nested_instance = instance.user
            nested_data = validated_data.pop('user')
            nested_serializer.update(nested_instance, nested_data)
        return super(SchoolAdminSerializer, self).update(instance, validated_data)
