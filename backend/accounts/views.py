import re
from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth.hashers import check_password
from .models import (
    User, Student, Teacher, SchoolAdmin
)
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from .serializers import PasswordChangeSerializer, StudentSerializer

# Create your views here.
def decode_JWT():
    pass


class UserView(APIView):
    
    def get(self, request):
        pass


class StudentView(APIView):
    model = Student
    
    def get(self, request, student_pk):
        student = get_object_or_404(Student, pk=student_pk)
        # student = Student.objects.get(pk=student_pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)


class TeacherView(APIView):
    model = Teacher
    
    def get(self, request):
        pass


class SchoolAdminView(APIView):
    model = SchoolAdmin
    
    def get(self, request):
        pass


class PasswordChangeView(APIView):
    model = User
    
    def put(self, request):
        # JWT 토큰 받고 처리하는 과정 확인 필요
        JWT_object = JWTAuthentication()
        header = JWT_object.get_header(request)
        print(header)
        raw_token = JWT_object.get_raw_token(header)
        print(raw_token)
        validated_token = JWT_object.get_validated_token(header)
        print(validated_token)
        user = JWT_object.get_user(validated_token)
        print(user)
        
        data = request.data
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')
        new_password_confirmation = data.get('newPasswordConfirmation')
        
        if check_password(old_password, user.password):
            serializer = PasswordChangeSerializer(
                data={
                    'old_password': old_password,
                    'new_password': new_password,
                    'new_password_confirmation': new_password_confirmation,
                }
            )
            if serializer.is_valid():
                user.set_password(new_password)
                user.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            response = {
                'error': 'wrong password'
            }
            pass
        
        return Response()


class PasswordResetView(APIView):
    
    def post(self, request):
        
        user = []
        data = request.data
        
        uesrname = data.get('username')
        email = data.get('email')
        
        # 1. email이 잘못된 경우
        # 2. 정확한 유저 정보일 때
        # 2-1. 새로운 비밀번호 생성 >> db 저장
        # 2-2. 이메일로 새로운 비밀번호 보내기
        
        pass
