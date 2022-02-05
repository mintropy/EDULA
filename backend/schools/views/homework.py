from msvcrt import kbhit
from django.shortcuts import get_object_or_404

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from drf_spectacular.utils import extend_schema, OpenApiResponse

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from accounts.views.user import decode_JWT
from server import basic_swagger_schema
from . import swagger_schema
from ..models import Homework
from ..serializers import HomeworkSerializer


class HomeworkViewSet(ViewSet):
    """About Homework
    
    """
    model = Homework
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkViewSet']['list'][200],
                examples=swagger_schema.examples['HomeworkViewSet']['homework_list'],
            ),
            401: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['HomeworkViewSet']['list']['description'],
        summary=swagger_schema.summaries['HomeworkViewSet']['list'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[401],
        ],
    )
    def list(self, request, lecture_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homeworks = Homework.objects.filter(lecture_id=lecture_pk)
        serializer = HomeworkSerializer(homeworks, many=True)  
        return Response(serializer.data)
    
    @extend_schema(
        responses={
            201: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkViewSet']['create'][201],
                examples=swagger_schema.examples['HomeworkViewSet']['homework_detail'],
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['HomeworkViewSet']['create']['description'],
        summary=swagger_schema.summaries['HomeworkViewSet']['create'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
            *swagger_schema.examples['HomeworkViewSet']['create']['request']
        ]
    )
    def create(self, request, lecture_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data
        new_data = {
            'title': data.get('title'),
            'content': data.get('content'),
            'deadline': data.get('deadline'),
            'writer': user.pk,
            'lecture':lecture_pk,
        }
        serializer = HomeworkSerializer(data=new_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkViewSet']['retrieve'][200],
                examples=swagger_schema.examples['HomeworkViewSet']['homework_detail']
            ),
            401: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['HomeworkViewSet']['retrieve']['description'],
        summary=swagger_schema.summaries['HomeworkViewSet']['retrieve'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[401],
        ],
    )
    def retrieve(self, request, lecture_pk, homework_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homework = get_object_or_404(Homework, lecture_id=lecture_pk, id=homework_pk)
        serializer = HomeworkSerializer(homework)
        return Response(serializer.data)
    
    @extend_schema(
        responses={
            201: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkViewSet']['update'][201],
                examples=swagger_schema.examples['HomeworkViewSet']['homework_detail'],
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['HomeworkViewSet']['update']['description'],
        summary=swagger_schema.summaries['HomeworkViewSet']['update'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
            *swagger_schema.examples['HomeworkViewSet']['create']['request'],
        ]
    )
    def update(self, request, lecture_pk, homework_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homework = get_object_or_404(Homework, lecture_id=lecture_pk, id=homework_pk)
        serializer = HomeworkSerializer(instance=homework, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @extend_schema(
        responses={
            204: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkViewSet']['destroy'][204],
                examples=swagger_schema.examples['HomeworkViewSet']['destroy'][204],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['HomeworkViewSet']['destroy']['description'],
        summary=swagger_schema.summaries['HomeworkViewSet']['destroy'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
        ]
    )
    def destroy(self, request, lecture_pk, homework_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homework = get_object_or_404(Homework, lecture_id=lecture_pk, id=homework_pk)
        homework.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
