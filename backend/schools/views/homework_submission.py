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
        responses={
            200: OpenApiResponse(
                response=HomeworkSubmissionSerialzier,
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['list'][200],
                examples=swagger_schema.examples['HomeworkSubmissionViewSet']['submission_list']
            ),
            204: OpenApiResponse(
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['list'][204],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['list']['description'],
        summary=swagger_schema.summaries['HomeworkSubmissionViewSet']['list'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
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
        if user.status == 'ST':
            submission = HomeworkSubmission.objects.filter(
                homework=homework_pk, writer=user.pk
            )
            if submission:
                serializer = HomeworkSubmissionSerialzier(submission[0])
                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    status=status.HTTP_204_NO_CONTENT
                )
        elif user.status in ['TE', 'SA']:
            submissions = HomeworkSubmission.objects.filter(homework=homework_pk)
            serializer = HomeworkSubmissionSerialzier(submissions, many=True)
            return Response(
                serializer.data,
            )
        return Response(
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    @extend_schema(
        responses={
            201: OpenApiResponse(
                response=HomeworkSubmissionSerialzier,
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['create'][201],
                examples=swagger_schema.examples['HomeworkSubmissionViewSet']['submission'],
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['create']['description'],
        summary=swagger_schema.summaries['HomeworkSubmissionViewSet']['create'],
        tags=['숙제'],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
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
        homework_submission = HomeworkSubmission.objects.\
            filter(homework_id=homework_pk, writer=user.pk)
        if homework_submission:
            serializer = HomeworkSubmissionSerialzier(instance=homework_submission[0], data=data)
        else:
            serializer = HomeworkSubmissionSerialzier(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=HomeworkSubmissionSerialzier,
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['retrieve'][200],
                examples=swagger_schema.examples['HomeworkSubmissionViewSet']['submission'],
            ),
            204: OpenApiResponse(
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['retrieve'][204],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['retrieve']['description'],
        summary=swagger_schema.summaries['HomeworkSubmissionViewSet']['retrieve'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
        ],
    )
    def retrieve(self, request, lecture_pk, homework_pk, user_pk):
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
        submission = HomeworkSubmission.objects.filter(
                homework=homework_pk, writer=user_pk,
            )
        if submission:
            serializer = HomeworkSubmissionSerialzier(submission[0])
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                status=status.HTTP_204_NO_CONTENT
            )
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['destroy'][200],
            ),
            204: OpenApiResponse(
                description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['destroy'][204],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['HomeworkSubmissionViewSet']['destroy']['description'],
        summary=swagger_schema.summaries['HomeworkSubmissionViewSet']['destroy'],
        tags=['숙제',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
        ]
    )
    def destroy(self, request, lecture_pk, homework_pk, user_pk):
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
        submission = HomeworkSubmission.objects.filter(
                homework=homework_pk, writer=user_pk,
            )
        if submission:
            submission[0].delete()
            return Response(
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                status=status.HTTP_204_NO_CONTENT
            )
