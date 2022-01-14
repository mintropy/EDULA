from django.shortcuts import get_list_or_404, get_object_or_404
from .models import (
    User, Student, Teacher, SchoolAdmin
)
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import StudentSerializer

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
    
    def post(self, request):
        print('request: ', request.data['jwt-tokenAuthorization'])
        JWT_token = request.data['jwt-tokenAuthorization']
        JWT_object = JWTAuthentication()
        validate_token = JWT_object.get_validated_token(JWT_token)
        user = JWT_object.get_user(validate_token)
        print('user: ', user)
        print('user pk: ', user.pk)
        pass
    
