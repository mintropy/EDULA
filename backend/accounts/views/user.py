import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication

from drf_spectacular.utils import (
    extend_schema, OpenApiResponse
)

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from server import basic_swagger_schema
from . import swagger_schema
from ..models import User
from ..serializers.user import(
    UserBasicSerializer, UserCreationSerialzier,
    FindUsernameSerializer, PasswordChangeSerializer, PasswordResetSerializer,
)
import serect


def decode_JWT(request) -> User:
    """return User from JWT token 
    
    decode JWT token userin simpleJWT
    
    Parameters
    ----------
    requset
    
    Returns
    -------
    User
    """
    JWT = JWTAuthentication()
    try:
        header = JWT.get_header(request).split()[1]
        validate_token = JWT.get_validated_token(header)
        user = JWT.get_user(validate_token)
        return user
    except:
        return None


def send_email(recipient_email, type, context):
    """Send username or password through email
    
    get user email and type, which is username or password
    send email with username or password
    
    Parameters
    ----------
    recipient: str
        email who will receive
    
    type : str[username | password]
        request type
    
    context : str
        if type is username, it should be username
        if type is password, it should be password
    
    returns
    -------
    None
    """
    try:
        if type == 'username':
            title = '회원님의 아이디입니다'
            context = f'''안녕하세요 Edula 입니다.
            아이디 : {context}
            '''
        elif type == 'password':
            title = '회원님의 비밀번호입니다'
            context = f'''안녕하세요, Edula 입니다.
            새로운 비밀번호 : {context}
            '''
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('edula.gugugugugugu@gmail.com', serect.gmail_password)
        message = MIMEMultipart()
        message['Subject'] = title
        message.attach(MIMEText(context))
        server.sendmail(
            "edula.gugugugugugu@gmail.com",
            recipient_email,
            message.as_string()
        )
        return True
    except:
        return False


def create_username(preset: str, length: int=7):
    """
    
    """
    username = preset
    random_num = random.choices(
        [str(i) for i in range(10)], k=length-len(preset)
    )
    username += ''.join(random_num)
    return username


def create_password():
    """Make new random password
    
    make new random password of length 14
    
    returns
    -------
    str
    """
    base_alpabet = [chr(97 + i) for i in range(26)]
    base_num = [str(i) for i in range(10)]
    base_special_char = ['!', '@', '#', '$']
    new_password = random.choices(base_alpabet, k=8)\
        + random.choices(base_num, k=4)\
        + random.choices(base_special_char, k=2)
    random.shuffle(new_password)
    return ''.join(new_password)


class UserView(APIView):
    """About user
    
    """
    model = User
    serializer_class = UserBasicSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=UserBasicSerializer,
                description=swagger_schema.descriptions['UserView']['get'][200],
                examples=swagger_schema.examples['UserView']['get'][200]
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['UserView']['get'][401],
                description=swagger_schema.descriptions['UserView']['get'][401],
            )
        },
        description=swagger_schema.descriptions['UserView']['get']['description'],
        summary=swagger_schema.summaries['UserView']['get'],
        tags=['user',],
        examples=[
            swagger_schema.examples['UserView']['get'][401]
        ],
    )
    def get(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = UserBasicSerializer(user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class UserCreationView(APIView):
    """User Creation
    
    """
    model = User
    serializer_class = UserCreationSerialzier
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        
    )
    def post(self, request):
        request_creation_count= request.data.get['creation_count']
        preset = 'test'
        data = {
            'user_creation_count': request_creation_count,
            'users': []
        }
        for _ in range(request_creation_count):
            failure_count = 0
            username = ''
            while failure_count < 5:
                new_username = create_username(preset)
                if User.objects.filter(username=new_username).exists():
                    failure_count += 1
                else:
                    break
            if username == '':
                continue
            password = create_password()
            if UserCreationSerialzier(data={'username': new_username, 'password': password}).is_valid():
                # new_user = User.objects.create(username= new_username, password= password)
                # new_user.save()
                data['users'].append(
                    {'username': new_username, 'password': password}
                )
        data['user_creation_count'] = len(data['users'])
        return Response(
            data, status=status.HTTP_201_CREATED
        )


class UserSpecifyingView(APIView):
    """User specifying
    
    search about user's id | username | status
    """
    model = User
    serializer_class = UserBasicSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=UserBasicSerializer,
                description=swagger_schema.descriptions['UserSpecifyingView']['get'][200]
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['UserSpecifyingView']['get'][401],
                description=swagger_schema.descriptions['UserSpecifyingView']['get'][401],
            ),
            404: OpenApiResponse(
                response=swagger_schema.schema_serializers['UserSpecifyingView']['get'][404],
                description=swagger_schema.descriptions['UserSpecifyingView']['get'][404],
            ),
        },
        description=swagger_schema.descriptions['UserSpecifyingView']['get']['description'],
        summary=swagger_schema.summaries['UserSpecifyingView']['get'],
        tags=['user'],
        examples=[
            swagger_schema.examples['UserSpecifyingView']['get'][401],
            swagger_schema.examples['UserSpecifyingView']['get'][404],
        ],
    )
    def get(self, request, user_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        requset_user = get_object_or_404(User, pk=user_pk)
        serializer = UserBasicSerializer(requset_user)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class FindUsernameView(APIView):
    """Find username
    
    """
    model = User
    serializer_class = FindUsernameSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=FindUsernameSerializer,
                description=swagger_schema.descriptions['FindUsernameView']['post'][200],
                examples=[
                    swagger_schema.examples['FindUsernameView']['post'][200]
                ]
            ),
            400: OpenApiResponse(
                response=swagger_schema.schema_serializers['FindUsernameView']['post'][400],
                description=swagger_schema.descriptions['FindUsernameView']['post'][400],
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['FindUsernameView']['post'][401],
                description=swagger_schema.descriptions['FindUsernameView']['post'][401],
            ),
        },
        description=swagger_schema.descriptions['FindUsernameView']['post']['description'],
        summary=swagger_schema.summaries['FindUsernameView']['post'],
        tags=['user', 'user information'],
        examples=[
            swagger_schema.examples['FindUsernameView']['post']['input'],
            swagger_schema.examples['FindUsernameView']['post'][400],
            swagger_schema.examples['FindUsernameView']['post'][401],
        ],
    )
    def post(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = {
            'id': user.pk,
            'first_name': request.data.get('first_name'),
            'email': request.data.get('email'),
        }
        serializer = FindUsernameSerializer(data=data)
        if not serializer.is_valid()\
            or data['email'] != user.email\
            or data['first_name'] != user.first_name:
                return Response(
                    {'error': 'wrong information'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif send_email(data['email'], 'username', user.username):
            return Response(
                {'success': 'email send'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'email send failure'},
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordChangeView(APIView):
    """Password change
    
    password chang from old password to new password
    """
    model = User
    serializer_class = PasswordChangeSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=PasswordChangeSerializer,
                description=swagger_schema.descriptions['PasswordChangeView']['put'][200],
            ),
            400: OpenApiResponse(
                response=swagger_schema.schema_serializers['PasswordChangeView']['put'][400],
                description=swagger_schema.descriptions['PasswordChangeView']['put'][400],
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['PasswordChangeView']['put'][401],
                description=swagger_schema.descriptions['PasswordChangeView']['put'][401],
            ),
        },
        description=swagger_schema.descriptions['PasswordChangeView']['put']['description'],
        summary=swagger_schema.summaries['PasswordChangeView']['put'],
        tags=['user', 'user information',],
        examples=[
            swagger_schema.examples['PasswordChangeView']['put'][400],
            swagger_schema.examples['PasswordChangeView']['put'][401],
        ],
    )
    def put(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        new_password_confirmation = data.get('new_password_confirmation')
        
        if not user.check_password(old_password):
            return Response(
                {'error': 'wrong password'},
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            serializer = PasswordChangeSerializer(
                data={
                    'old_password': old_password,
                    'new_password': new_password,
                    'new_password_confirmation': new_password_confirmation,
                }
            )
            if new_password != new_password_confirmation:
                return Response(
                    {'error': 'check new password and new password confirmaion'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            elif serializer.is_valid():
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


class PasswordResetView(APIView):
    """Reset user password
    
    """
    model = User
    serializer_class = PasswordResetSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=PasswordResetSerializer,
                description=swagger_schema.descriptions['PasswordResetView']['put'][200],
            ),
            400: OpenApiResponse(
                response=swagger_schema.schema_serializers['PasswordResetView']['put'][400],
                description=swagger_schema.descriptions['PasswordResetView']['put'][400],
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['PasswordResetView']['put'][401],
                description=swagger_schema.descriptions['PasswordResetView']['put'][401],
            ),
        },
        description=swagger_schema.descriptions['PasswordResetView']['put']['description'],
        summary=swagger_schema.summaries['PasswordResetView']['put'],
        tags=['user', 'user information'],
        examples=[
            swagger_schema.examples['PasswordResetView']['put'][400],
            swagger_schema.examples['PasswordResetView']['put'][401],
        ],
    )
    def put(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = {
            'id': user.pk,
            'username': request.data.get('username'),
            'email': request.data.get('email'),
        }
        new_password = create_password()
        serializer = PasswordResetSerializer(data=data)
        if not serializer.is_valid()\
            or data['username'] != user.username\
            or data['email'] != user.email:
            return Response(
                {'error': 'wrong information'},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif send_email(data['email'], 'password', new_password):
            user.set_password(new_password)
            user.save()
            return Response(
                {'success': 'email send'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'email send failure'},
                status=status.HTTP_400_BAD_REQUEST
            )
