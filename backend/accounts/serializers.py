from rest_framework import serializers

from . models import User, Student, Teacher


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


class PasswordChangeSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, required=True)
    new_password_confirmation = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('old_password', 'new_password', 'new_password_confirmation')
