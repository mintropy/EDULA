from rest_framework import serializers

from . models import School, Homework, Lecture, Classroom


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
