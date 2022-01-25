from drf_spectacular.utils import (
    OpenApiExample, OpenApiResponse, inline_serializer
)
from rest_framework import serializers


schema_serializers = {
    'HomeworkView': {
        'get': {
            401: inline_serializer(
                name='error',
                fields={
                    'error': serializers.CharField(),
                },
            ),
        },
    },
}

descriptions = {
    'HomeworkView': {
        'description': 
    '''
    Decode JWT token, return user infromation
from JWT, return primary key of user and user's satatus
    ''',
        'get': {
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
}

summaries = {
    'HomeworkView': 'do it after login(get JWT token)',
}

examples = {
    'HomeworkView': {
        'get': {
            200: [
            OpenApiExample(
                name='student',
                value={
                    "id": 0,
                    "title": "string",
                    "content": "string",
                    "created_at": "2022-01-24T02:05:04.172Z",
                    "deadline": "2022-01-24T02:05:04.172Z",
                    "writer_pk": 0,
                    "writer_name": "string",
                    "lecture": 0
                },
            ),
            ],
            401: OpenApiExample(
                name='error',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
            ),
        }
    },
}
