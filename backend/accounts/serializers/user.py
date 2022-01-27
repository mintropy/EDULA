from rest_framework import serializers

from ..models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'email', 'phone', 'status')
        read_only_fields = ('id', 'username', 'first_name', 'status')


class UserBasicSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'status')
        read_only_fields = ('id', 'username', 'first_name', 'status')


class UserCUDSerialzier(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password',)
        write_only_field = ('password',)


class FindUsernameSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields = ('id', 'first_name', 'email',)


class PasswordChangeSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, required=True)
    new_password_confirmation = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'old_password', 'status',\
            'new_password', 'new_password_confirmation')
        read_only_fields = ('id', 'username', 'status')


class PasswordResetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields = ('id', 'username', 'email',)
