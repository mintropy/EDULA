from asyncore import read
from rest_framework import serializers

from . models import (
    School, Lecture, Classroom,
    Homework, HomeworkSubmission,
    Article
)
from accounts.models import Student, Teacher, User
from accounts.serializers.user import UserBasicSerializer

class StudentBasciSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer()
    
    class Meta:
        model = Student
        fields = ('user',)


class TeacherBasicSerialzier(serializers.ModelSerializer):
    user = UserBasicSerializer()
    
    class Meta:
        model = Teacher
        fields = ('user',)


class SchoolSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = School
        fields = '__all__'


class LectureSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Lecture
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['teacher'] = UserBasicSerializer(
            User.objects.get(pk=data['teacher'])).data
        return data


class LectrueDetailSerializer(serializers.ModelSerializer):
    student_list = StudentBasciSerializer(many=True)
    teacher = TeacherBasicSerialzier()
    
    class Meta:
        model = Lecture
        fields = '__all__'


class ClassroomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Classroom
        fields = '__all__'


class HomeworkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Homework
        fields = '__all__'


class HomeworkSubmissionSerialzier(serializers.ModelSerializer):
    
    class Meta:
        model = HomeworkSubmission
        fields = '__all__'


class HomeworkDetailSerializer(serializers.ModelSerializer):
    submission = HomeworkSubmissionSerialzier(many=True)
    
    class Meta:
        model = Homework
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Article
        fields = '__all__'


class ArticleDetailSerializer(serializers.ModelSerializer):
    writer = UserBasicSerializer()
    
    class Meta:
        model = Article
        fields = '__all__'
