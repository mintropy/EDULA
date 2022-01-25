from rest_framework import serializers

from ..models import Student
from schools.models import Classroom, School
from .user import UserDetailSerializer


class StudentSerializer(serializers.ModelSerializer):
    
    class ClassroomSerializer(serializers.ModelSerializer):
        class Meta:
            model = Classroom
            fields = ('id', 'class_grade', 'class_num')
    
    class SchoolSerializer(serializers.ModelSerializer):
        class Meta:
            model = School
            fields = '__all__'
    
    user = UserDetailSerializer()
    classroom = ClassroomSerializer(read_only=True)
    school = SchoolSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'
    
    def update(self, instance, validated_data):
        if 'user' in validated_data:
            nested_serializer = self.fields['user']
            nested_instance = instance.user
            nested_data = validated_data.pop('user')
            nested_serializer.update(nested_instance, nested_data)
        return super(StudentSerializer, self).update(instance, validated_data)