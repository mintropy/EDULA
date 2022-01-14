from rest_framework import serializers

from . models import User, Student


class StudentSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'username', 'email', 'status')
    
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = '__all__'
