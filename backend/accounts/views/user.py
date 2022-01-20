from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication

from ..models import User
from ..serializers import UserDetailSerializer, PasswordChangeSerializer


def decode_JWT(request) -> User:
    JWT = JWTAuthentication()
    try:
        header = JWT.get_header(request).split()[1]
        validate_token = JWT.get_validated_token(header)
        user = JWT.get_user(validate_token)
        return user
    except:
        return None


class UserView(APIView):
    """About user
    
    """
    model = User
    serializer_class = UserDetailSerializer
    
    def get(self, request):
        """Get user information.
        
        Decode JWT token, return user infromation
        
        Request Head
        ------------
        JWT : int
        
        Returns
        -------
        200 OK<br>
        id : int,
            user primary key based on DB<br>
        status : str,
            weather user is student, teacher or school admin<br>
        
        401 Unauthorized
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = UserDetailSerializer(user)
        return Response(serializer.data)


class PasswordChangeView(APIView):
    model = User
    
    def put(self, request):
        user = decode_JWT(request)
        data = request.data
        print(data)
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
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordResetView(APIView):
    
    def post(self, request):
        
        user = []
        data = request.data
        
        username = data.get('username')
        email = data.get('email')
        
        # 1. email이 잘못된 경우
        # 2. 정확한 유저 정보일 때
        # 2-1. 새로운 비밀번호 생성 >> db 저장
        # 2-2. 이메일로 새로운 비밀번호 보내기
        
        pass
