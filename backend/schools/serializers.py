from django.forms import models
from rest_framework import serializers

from . models import Homework, Lecture, Classroom
from accounts.models import User, Student, Teacher


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