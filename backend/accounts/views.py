from django.shortcuts import get_list_or_404, get_object_or_404
from .models import (
    User, Student, Teacher, SchoolAdmin
)
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework import serializers
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import PasswordChangeSerializer, StudentSerializer

from drf_spectacular.utils import (
    extend_schema, extend_schema_field, extend_schema_view, extend_schema_serializer,
    OpenApiExample, OpenApiParameter, OpenApiSchemaBase, OpenApiResponse, inline_serializer
)
from drf_spectacular.extensions import (
    OpenApiAuthenticationExtension
)
from drf_spectacular.contrib.rest_framework_simplejwt import SimpleJWTScheme
from rest_framework_simplejwt.authentication import JWTAuthentication as JWTA


class CustomJWTAuthentication(JWTA):
    pass

class SimpleJWTTokenUserScheme(SimpleJWTScheme):
    name = 'customJWTAuth'
    target_class = CustomJWTAuthentication
    
    def get_security_definition(self, auto_schema):
        return {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }


# Create your views here.
def decode_JWT(request) -> User:
    JWT = JWTAuthentication()
    header = JWT.get_header(request).split()[1]
    validate_token = JWT.get_validated_token(header)
    user = JWT.get_user(validate_token)
    return user


class UserView(APIView):
    
    def get(self, request):
        pass


class StudentView(APIView):
    model = Student
    serializer_class = StudentSerializer
    
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


class AuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = 'accounts.PasswordChangeView'
    name = 'Authentication'
    
    def get_security_definition(self, auto_schema):
        return {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }


class PasswordChangeView(APIView):
    model = User
    queryset = User.objects.all()
    serializer_class = PasswordChangeSerializer
    
    @permission_classes([IsAuthenticated])
    @extend_schema(
        tags=['password'],
        description='password change',
        # request={
        #     'Header': 'JWT',
        #     # Body: [
        #     #     'oldPassword', 'newPassword', 'newPasswordConfirmation'
        #     # ]
        # }
        parameters=[
            # OpenApiParameter(
            #     name='JWT',
            #     type=str,
            #     location=OpenApiParameter.HEADER,
            #     required=True,
            #     description='JWT token',
            # ),
            # OpenApiParameter(
            #     name='oldPassword',
            #     type=str,
            #     required=True,
            #     description='password now',
            # ),
        ],
        responses={
            200: OpenApiResponse(
                response=PasswordChangeSerializer,
                description='Password Changed'
                ),
            401: OpenApiResponse(
                response={'error': '비밀번호가 틀렸습니다'},
                description='Unauthorized, Password is wrong'
            ),
            400: {
                'properties': {
                    'message': {
                        'type': 'string'
                    },
                },
                'example': {
                    'message': 'error: wrong password'
                }
            }
        },
        auth=[
        ],
    )
    def patch(self, request, *args, **kwargs):
        print(request)
        user = decode_JWT(request)
        data = request.data
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')
        new_password_confirmation = data.get('newPasswordConfirmation')
        
        if user.check_password(old_password):
            serializer = PasswordChangeSerializer(
                data={
                    'old_password': old_password,
                    'new_password': new_password,
                    'new_password_confirmation': new_password_confirmation,
                }
            )
            if new_password != new_password_confirmation:
                return Response(
                    {'error': '새로운 비밀번호가 틀렸습니다'}
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
            return Response(
                {'error': '비밀번호가 틀렸습니다'},
                status=status.HTTP_401_UNAUTHORIZED
            )


class PasswordResetView(APIView):
    
    def put(self, request):
        
        user = []
        data = request.data
        
        username = data.get('username')
        email = data.get('email')
        
        # 1. email이 잘못된 경우
        # 2. 정확한 유저 정보일 때
        # 2-1. 새로운 비밀번호 생성 >> db 저장
        # 2-2. 이메일로 새로운 비밀번호 보내기
        
        pass
