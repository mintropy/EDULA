from django.shortcuts import get_object_or_404

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from drf_spectacular.utils import extend_schema, OpenApiResponse

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser

from accounts.views.user import decode_JWT
from server import basic_swagger_schema
from . import swagger_schema
from ..models import Homework, HomeworkSubmission
from ..serializers import HomeworkSubmissionSerialzier


class HomeworkSubmissionViewSet(ViewSet):
    """About Homework
    
    """
    model = HomeworkSubmission
    queryset = Homework.objects.all()
    serializer_class = HomeworkSubmissionSerialzier
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser, MultiPartParser, FileUploadParser]
    
    @extend_schema(
        description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['list']['description'],
        summary=swagger_schema.summaries['HomeworkSubmissionViewSet']['list'],
        tags=['숙제',],
        examples=[
            
        ],
    )
    def list(self, request, lecture_pk, homework_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        if not Homework.objects.filter(pk=homework_pk).exists()\
            or Homework.objects.get(pk=homework_pk).lecture.pk != lecture_pk:
                return Response(
                    status=status.HTTP_404_NOT_FOUND
                )
        submissions = HomeworkSubmission.objects.filter(homework=homework_pk)
        serializer = HomeworkSubmissionSerialzier(submissions, many=True)
        return Response(
            serializer.data,
        )
    
    @extend_schema(
        description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['create']['description'],
        summary=swagger_schema.summaries['HomeworkSubmissionViewSet']['create'],
        tags=['숙제'],
        examples=[
            
        ]
    )
    def create(self, request, lecture_pk, homework_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        if not Homework.objects.filter(pk=homework_pk).exists()\
            or Homework.objects.get(pk=homework_pk).lecture.pk != lecture_pk:
                return Response(
                    status=status.HTTP_404_NOT_FOUND
                )
        data = {
            'title': request.data.get('title', None),
            'content': request.data.get('content', None),
            'file': request.FILES.get('file', None),
            'homework': homework_pk,
            'writer': user.pk, 
        }
        serializer = HomeworkSubmissionSerialzier(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
            )
        else:
            return Response(
                serializer.errors,
            )
    
    @extend_schema(
        tags=['숙제',]
    )
    def retrieve(self, request, lecture_pk, submission_pk):
        pass
