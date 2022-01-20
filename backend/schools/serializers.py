from rest_framework import serializers

from . models import Lecture, Classroom
from accounts.models import User, Student, Teacher

class LectureSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Lecture
        fields = '__all__'
        

class StudentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'username', 'email', 'status')
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'
        
        
class TeacherSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'username', 'email', 'status')
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Teacher
        fields = '__all__'


class ClassroomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Classroom
        fields = '__all__'