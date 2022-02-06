from rest_framework import serializers

from . models import (
    School, Lecture, Classroom,
    Homework, HomeworkSubmission,
    Article
)


class SchoolSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = School
        fields = '__all__'


class LectureSerializer(serializers.ModelSerializer):
    
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
