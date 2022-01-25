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
        'post': {
            400: inline_serializer(
                name='error',
                fields={
                    'error': serializers.CharField(),
                },
            ),
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
    Get total homework of school information
Use lecture_pk, return total homework information
    ''',
        'get': {
            200: 
    '''
    Successfully get total homework list
successfully get total homework information from lecture_pk
    ''',
            401:
    '''
    Unauthorized
Wrong JWT or unauthorized user
    ''',
        },
        'post': {
            200: 
    '''
    Successfully get total homework list
successfully get total homework information from lecture_pk
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
    'HomeworkView': {
        'get' : 'Total homework of lecture',
        'post' : 'Post homework of lecture',
    }
}

examples = {
    'HomeworkView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
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
                response_only=True
            ),
        },
        'post': {
            200: [
            OpenApiExample(
                name='user',
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
            400: OpenApiExample(
                name='error',
                value={
                    'error': 'Bad Request',
                },
                status_codes=['400'],
                response_only=True
            ),
            401: OpenApiExample(
                name='error',
                value={
                    'error': 'Unauthorized',
                },
                status_codes=['401'],
                response_only=True
            ),
        }
    },
}
