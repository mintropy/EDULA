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
        }
    }
}

summaries = {
    'UserView': {
        'get': 'do it after login(get JWT token)',
    },
    'PasswordChangeView': {
        'put': 'one\'s own self password change'
    },
    'FindUsernameView': {
        'post': 'get username through email'
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
}
