from drf_spectacular.utils import (
    OpenApiExample, OpenApiResponse, inline_serializer
)
from rest_framework import serializers


schema_serializers = {
    'HomeworkView': {
        'get': {
            401: inline_serializer(
                name='unauthorized',
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
    'HomeworkDetailView': {
        'get': {
            401: inline_serializer(
                name='unauthorized',
                fields={
                    'error': serializers.CharField(),
                },
            ),
        },
        'put': {
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
        'get': {
            'description': 
    '''
    Get total homework of school information
Use lecture_pk, return total homework information
    ''',
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
            'description': 
    '''
    Post homework information
Input homework information
    ''',
            200: 
    '''
    Successfully post homework
successfully input homework
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
    'HomeworkDetailView': {
        'get': {
            'description': 
    '''
    Get homework information
Use lecture_pk and homework_pk, return homework information
    ''',
            200: 
    '''
    Successfully get homework information
successfully get homework information from lecture_pk and homework_pk
    ''',
            401:
    '''
    Unauthorized
Wrong JWT or unauthorized user
    ''',
        },
        'put': {
            'description': 
    '''
    Change homework information
homework information changed
    ''',
            200: 
    '''
    Successfully Put homework
successfully change homework
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
        'get' : 'Get detail homework information',
        'post' : 'Post homework of lecture',
    },
    'HomeworkDetailView': {
        'get' : 'Get detail homework information',
        'put' : 'Put homework information',
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
            'input': OpenApiExample(
                name='input example',
                value={
                    "title": "string",
                    "content": "string",
                    "deadline": "2022-01-25T05:49:19.152Z",
                },
                request_only=True,
            ),
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
    'HomeworkDetailView': {
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
        'put': {
            'input': OpenApiExample(
                name='input example',
                value={
                    "title": "string",
                    "content": "string",
                    "deadline": "2022-01-25T05:49:19.152Z",
                },
                request_only=True,
            ),
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
