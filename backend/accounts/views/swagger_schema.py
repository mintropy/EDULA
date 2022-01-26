from drf_spectacular.utils import (
    OpenApiExample, inline_serializer
)
from rest_framework import serializers


schema_serializers = {
    'UserView': {
        'get': {
            401: inline_serializer(
                name='unauthorized',
                fields={
                    'error': serializers.CharField(),
                },
            ),
        },
    },
    'UserSpecifyingView': {
        'get': {
            401: inline_serializer(
                name='user specifying unauthorized',
                fields={
                    'error': serializers.CharField(),
                },
            ),
            404: inline_serializer(
                name='user specifying not found',
                fields={
                    'error': serializers.CharField(),
                },
            ),
        },
    },
    'FindUsernameView': {
        'post': {
            400: inline_serializer(
                name='find username bad request serializer',
                fields={
                    'error': serializers.CharField()
                },
            ),
            401 : inline_serializer(
                name='find username unauthorized serializer',
                fields={
                    'error': serializers.CharField()
                },
            ),
        },
    },
    'PasswordChangeView': {
        'put': {
            400: inline_serializer(
                name='password change bad request serializer',
                fields={
                    'error': serializers.CharField(),
                },
            ),
            401: inline_serializer(
                name='password change unauthorized serializer',
                fields={
                    'error': serializers.CharField()
                },
            ),
        },
    },
    'PasswordResetView': {
        'put': {
            400: inline_serializer(
                name='password reset bad request serializer',
                fields={
                    'error': serializers.CharField(),
                },
            ),
            401: inline_serializer(
                name='password reset unauthorized serializer',
                fields={
                    'error': serializers.CharField()
                },
            ),
        },
    },
}

descriptions = {
    'UserView': {
        'get': {
            'description': 
    '''
    Decode JWT token, return user infromation
from JWT, return primary key of user and user's satatus
    ''',
            200: 
    '''
    Successfully get user information
successfully get user information from JWT token
    ''',
            400:
    '''
    Bad Request
    ''',
            401:
    '''
    Unauthorized
Wrong JWT or unauthorized user
    ''',
        },
    },
    'UserSpecifyingView': {
        'get': {
            'description': 
    '''
    Get User's id, username and status
User's id is same with user_pk
    ''',
            200: 
    '''
    Successfully get user
    ''',
            401: 
    '''
    Unauthorized
Wrong JWT or unauthorized user
    ''',
            404: 
    '''
    User not found
    ''',
        },
    },
    'FindUsernameView': {
        'post': {
            'description':
    '''
    Get username through email
input with first_name(user name) and email
    ''',
            200:
    '''
    Successfully get username through email
    ''',
            400:
    '''
    Wrong information or email send failure
wrong information input or email failure
    ''',
            401:
    '''
    Unauthorized
Wrong JWT or unauthorized user
    ''',
        },
    },
    'PasswordChangeView': {
        'put': {
            'description': 
    '''
    Change one's own self password
only one's own self password could be chagned
    ''',
            200: 
    '''
    Successfully password changed
    ''',
            400:
    '''
    Passward is wrong
Exising password is wrong, check existing password
Or new password confirmation failed
    ''',
            401:
    '''
    Unauthorized
Wrong JWT or unauthorized user
    ''',
        },
    },
    'PasswordResetView': {
        'put': {
            'description':
    '''
    Reset one's own self password, get through email
only one'w own slef password could be reset
and get reset password through email
    ''',
            200:
    '''
    Successfully reset password and send email
successfully reset password, and set as password
reset password send through email
    ''',
            400:
    '''
    Wrong information or email send failure
wrong information input or email failure
    ''',
            401:
    '''
    Wrong JWT or unauthorized user
    ''',
        },
    },
    'StudentView': {
        'get': {
            'description':
    '''
    Get student information
student information using student_pk
    ''',
            200:
    '''
    Successfully get student information
    ''',
        },
        'put': {
            'description':
    '''
    Update student's own self information
email, phone, guardian phone could be updated
    ''',
            201:
    '''
    Successfully update student information
and get updated information
    ''',
        },
    },
    'TeacherView': {
        'get': {
            'description':
    '''
    Get teacher information
teacher information using teacher_pk
    ''',
        200 : 
    '''
    Successfully get teacher information
    ''',
        },
        'put': {
            'description':
    '''
    Update teacher's own self information
email and phone could be updated
    ''',
            201:
    '''
    Successfully update teacher information
and get updated information
    ''',
        },
    },
    'SchoolAdminView': {
        'get': {
            'description':
    '''
    Get school admin information
school admin information using teacher_pk
    ''',
        200 : 
    '''
    Successfully get school admin information
    ''',
        },
        'put': {
            'description':
    '''
    Update school admin's own self information
email and phone could be updated
    ''',
            201:
    '''
    Successfully update school admin information
and get updated information
    ''',
        },
    },
}

summaries = {
    'UserView': {
        'get': 'do it after login(get JWT token)',
    },
    'UserSpecifyingView': {
        'get': 'specify user using user_pk'
    },
    'FindUsernameView': {
        'post': 'get username through email',
    },
    'PasswordChangeView': {
        'put': 'one\'s own self password change',
    },
    'PasswordResetView': {
        'put': 'get reset password through email',
    },
    'StudentView': {
        'get': 'get studnet information',
        'put': 'update student information',
    },
    'TeacherView': {
        'get': 'get teacher information',
        'put': 'update teacher information',
    },
    'SchoolAdminView': {
        'get': 'get school admin information',
        'put': 'update school admin information',
    }
}

examples = {
    'UserView': {
        'get': {
            200: [
            OpenApiExample(
                name='student',
                value={
                    'id': 0,
                    'status': 'ST',
                },
            ),
            OpenApiExample(
                name='teacher',
                value={
                    'id': 0,
                    'status': 'TE',
                },
            ),
            OpenApiExample(
                name='school admin',
                value={
                    'id': 0,
                    'status': 'SA',
                },
            ),
            ],
            401: OpenApiExample(
                name='error',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
                response_only=True,
            ),
        },
    },
    'UserSpecifyingView': {
        'get': {
            401: OpenApiExample(
                name='unauthorized',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
                response_only=True,
            ),
            404: OpenApiExample(
                name='not found',
                value={
                    'error': 'Not Found',
                },
                status_codes=['404'],
                response_only=True
            ),
        }
    },
    'FindUsernameView': {
        'post': {
            'input': OpenApiExample(
                name='input example',
                value={
                    'firstName': '김싸피',
                    'email': 'ssafy@example.com'
                },
                request_only=True,
            ),
            200: OpenApiExample(
                name='user information',
                value={
                    'id': 0,
                    'firstName': '김싸피',
                    'email': 'ssafy@example.com',
                },
                status_codes=['200'],
                response_only=True,
            ),
            400: OpenApiExample(
                name='bad request',
                value={
                    'error': 'Bad Request',
                },
                status_codes=['400'],
                response_only=True
            ),
            401: OpenApiExample(
                name='unauthorized',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
                response_only=True,
            ),
        },
    },
    'PasswordChangeView': {
        'put': {
            400: OpenApiExample(
                name='bad request',
                value={
                    'error': 'Bad Request',
                },
                status_codes=['400'],
                response_only=True,
            ),
            401: OpenApiExample(
                name='unauthorized',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
                response_only=True,
            ),
        },
    },
    'PasswordResetView': {
        'put': {
            400: OpenApiExample(
                name='bad request',
                value={
                    'error': 'Bad Request',
                },
                status_codes=['400'],
                response_only=True,
            ),
            401: OpenApiExample(
                name='unauthorized',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
                response_only=True,
            ),
        },
    },
    'StudentView': {
        'get': {
            200: OpenApiExample(
                name='student',
                value={
                    'user': {
                        'id': 0,
                        'username': '김싸피',
                        'email': 'ssafy@example.com',
                        'phone': '999-9999-9999',
                        'status': 'ST',
                    },
                    'classroom': {
                        'id': 0,
                        'classGrage': 1,
                        'calssNum': 3,
                    },
                    'school': {
                        'id': 0,
                        'name': '싸피 초등학교',
                    },
                    'guardianPhone': '999-9999-9990',
                },
                status_codes=['200'],
                response_only=True,
            ),
        },
        'put': {
            'request': OpenApiExample(
                name='request',
                value={
                    'user': {
                        'email': 'new-ssafy@example.com',
                        'phone': '998-9999-9999',
                    },
                    'guardianPhone': '998-9999-9990',
                },
                request_only=True,
            ),
            201: OpenApiExample(
                name='student',
                value={
                    'user': {
                        'id': 0,
                        'username': '김싸피',
                        'email': 'new-ssafy@example.com',
                        'phone': '998-9999-9999',
                        'status': 'ST',
                    },
                    'classroom': {
                        'id': 0,
                        'classGrage': 1,
                        'calssNum': 3,
                    },
                    'school': {
                        'id': 0,
                        'name': '싸피 초등학교',
                    },
                    'guardianPhone': '998-9999-9990',
                },
                status_codes=['201'],
                response_only=True,
            ),
        },
    },
    'TeacherView': {
        'get': {
            200: OpenApiExample(
                name='teacher',
                value={
                    'user': {
                        'id': 0,
                        'username': '김싸피',
                        'email': 'ssafy@example.com',
                        'phone': '999-9999-9999',
                        'status': 'TE',
                    },
                    'classroom': {
                        'id': 0,
                        'classGrage': 1,
                        'calssNum': 3,
                    },
                    'school': {
                        'id': 0,
                        'name': '싸피 초등학교',
                    },
                },
                status_codes=['200'],
                response_only=True,
            ),
        },
        'put': {
            'request': OpenApiExample(
                name='request',
                value={
                    'user': {
                        'email': 'new-ssafy@example.com',
                        'phone': '998-9999-9999',
                    },
                },
                request_only=True,
            ),
            201: OpenApiExample(
                name='teacher',
                value={
                    'user': {
                        'id': 0,
                        'username': '김싸피',
                        'email': 'new-ssafy@example.com',
                        'phone': '998-9999-9999',
                        'status': 'TE',
                    },
                    'classroom': {
                        'id': 0,
                        'classGrage': 1,
                        'calssNum': 3,
                    },
                    'school': {
                        'id': 0,
                        'name': '싸피 초등학교',
                    },
                },
                status_codes=['201'],
                response_only=True,
            ),
        },
    },
    'SchoolAdminView': {
        'get': {
            200: OpenApiExample(
                name='school admin',
                value={
                    'user': {
                        'id': 0,
                        'username': '김싸피',
                        'email': 'ssafy@example.com',
                        'phone': '999-9999-9999',
                        'status': 'SA',
                    },
                    'classroom': {
                        'id': 0,
                        'classGrage': 1,
                        'calssNum': 3,
                    },
                    'school': {
                        'id': 0,
                        'name': '싸피 초등학교',
                    },
                },
                status_codes=['200'],
                response_only=True,
            ),
        },
        'put': {
            'request': OpenApiExample(
                name='request',
                value={
                    'user': {
                        'email': 'new-ssafy@example.com',
                        'phone': '998-9999-9999',
                    },
                },
                request_only=True,
            ),
            201: OpenApiExample(
                name='school admin',
                value={
                    'user': {
                        'id': 0,
                        'username': '김싸피',
                        'email': 'new-ssafy@example.com',
                        'phone': '998-9999-9999',
                        'status': 'TE',
                    },
                    'classroom': {
                        'id': 0,
                        'classGrage': 1,
                        'calssNum': 3,
                    },
                    'school': {
                        'id': 0,
                        'name': '싸피 초등학교',
                    },
                },
                status_codes=['201'],
                response_only=True,
            ),
        },
    },
}
