from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import smtplib

from django.shortcuts import get_list_or_404, get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
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
    UserBasicSerializer, UserCUDSerialzier,
    FindUsernameSerializer, PasswordChangeSerializer, PasswordResetSerializer,
    FriendSerializer
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
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['UserView']['get']['description'],
        summary=swagger_schema.summaries['UserView']['get'],
        tags=['유저',],
        examples=[
            basic_swagger_schema.examples[401],
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


class UserSpecifyingView(APIView):
    """User specifying
    
    search about user's id | username | first_name | status
    """
    model = User
    serializer_class = UserBasicSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=UserBasicSerializer,
                description=swagger_schema.descriptions['UserSpecifyingView']['get'][200],
                examples=swagger_schema.examples['UserSpecifyingView']['get'][200]
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['UserSpecifyingView']['get']['description'],
        summary=swagger_schema.summaries['UserSpecifyingView']['get'],
        tags=['유저',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
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


class UserCUDView(APIView):
    """User create / update / delete view
    use user UserView or UserSpecifyingView if you want read user
    """
    model = User
    serializer_class = UserCUDSerialzier
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        
    )
    def post(self, request):
        user = decode_JWT(request)
        if user == None or user.status != 'SA':
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        student_creation_count = request.data.get('student_creation_count')
        teacher_creation_count = request.data.get('teacher_creation_count')
        shcool_pk = user.school_admin.pk
        abbreviation = user.school_admin.abbreviation
        data = {
            'abbreviation': abbreviation,
            'student_creation_count': student_creation_count,
            'teacher_creation_count': teacher_creation_count,
            'student': [],
            'teacher': [],
        }
        # username preset의 마지막
        last_user = User.objects.filter(username__startswith=abbreviation).order_by('-pk')[0]
        start_num = int(last_user.username[len(abbreviation):]) + 1
        teachers = [
            {'username': abbreviation + str(i).zfill(3), 'password': create_password()}
            for i in range(start_num, start_num + teacher_creation_count)
        ]
        students = [
            {'username': abbreviation + str(i).zfill(3), 'password': create_password()}
            for i in range(
                start_num + teacher_creation_count, 
                start_num + teacher_creation_count + student_creation_count
            )
        ]
        
        # for _ in range(creation_count):
        #     failure_count = 0
        #     username = ''
        #     while failure_count < 5:
        #         new_username = create_username(preset)
        #         if User.objects.filter(username=new_username).exists():
        #             failure_count += 1
        #         else:
        #             username = new_username
        #             break
        #     if username == '':
        #         continue
        #     password = create_password()
        #     if UserCUDSerialzier(data={'username': new_username, 'password': password}).is_valid():
        #         # new_user = User.objects.create(username= new_username, password= password)
        #         # new_user.save()
        #         data['users'].append(
        #             {'username': new_username, 'password': password}
        #         )\
        # return Response(
        #     data, status=status.HTTP_201_CREATED
        # )
        return Response(
            data={'teacher': teachers, 'student': students}
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
            401: basic_swagger_schema.open_api_response[400],
            404: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['FindUsernameView']['post']['description'],
        summary=swagger_schema.summaries['FindUsernameView']['post'],
        tags=['유저',],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
            swagger_schema.examples['FindUsernameView']['post']['request'],
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
            201: OpenApiResponse(
                response=PasswordChangeSerializer,
                description=swagger_schema.descriptions['PasswordChangeView']['put'][201],
            ),
            401: basic_swagger_schema.open_api_response[400],
            404: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['PasswordChangeView']['put']['description'],
        summary=swagger_schema.summaries['PasswordChangeView']['put'],
        tags=['유저',],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
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
                    status=status.HTTP_201_CREATED
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
            201: OpenApiResponse(
                response=PasswordResetSerializer,
                description=swagger_schema.descriptions['PasswordResetView']['put'][201],
            ),
            401: basic_swagger_schema.open_api_response[400],
            404: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['PasswordResetView']['put']['description'],
        summary=swagger_schema.summaries['PasswordResetView']['put'],
        tags=['유저',],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
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
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {'error': 'email send failure'},
                status=status.HTTP_400_BAD_REQUEST
            )


class FriendViewSet(ViewSet):
    """About user friends list
    
    """
    model = User
    queryset = User.objects.all()
    serializer_class = FriendSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=FriendSerializer,
                description=swagger_schema.descriptions['FriendViewSet']['list'][200],
                examples=swagger_schema.examples['FriendViewSet']['list'][200],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['FriendViewSet']['list']['description'],
        summary=swagger_schema.summaries['FriendViewSet']['list'],
        tags=['친구',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
        ],
    )
    def list(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        friends = get_list_or_404(user.friend_list)
        serializer = FriendSerializer(friends, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=FriendSerializer,
                description=swagger_schema.descriptions['FriendViewSet']['destroy'][200],
                examples=swagger_schema.examples['FriendViewSet']['destroy'][200],
            ),
            204: OpenApiResponse(
                description=swagger_schema.descriptions['FriendViewSet']['destroy'][204],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['FriendViewSet']['destroy']['description'],
        summary=swagger_schema.summaries['FriendViewSet']['destroy'],
        tags=['친구',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
        ]
    )
    def destroy(self, request, friend_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        friend = get_object_or_404(user.friend_list, pk=friend_pk)
        user.friend_list.remove(friend)
        friends = user.friend_list.all()
        if friends:
            serializer = FriendSerializer(friends, many=True)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
