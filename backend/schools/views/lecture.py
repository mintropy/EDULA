from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from accounts.views.user import decode_JWT
from . import swagger_schema
from ..models import Lecture
from ..serializers import LectureSerializer
from server import basic_swagger_schema


class LectureView(APIView):
    model = Lecture
    serializer_class = LectureSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=LectureSerializer,
                description=swagger_schema.descriptions['LectureView']['get'][200],
                examples=swagger_schema.examples['LectureView']['get'][200]
            ),
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['LectureView']['get']['description'],
        summary=swagger_schema.summaries['LectureView']['get'],
        tags=['lecture',],
        examples=[
            basic_swagger_schema.examples[401]
        ],
    )
    def get(self, request,school_pk):
        """Get total lecture of school information
        
        Use school_pk, return total lecture of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        lectures = Lecture.objects.filter(school_id=school_pk)
        serializer = LectureSerializer(lectures, many=True)  
        return Response(serializer.data)
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=LectureSerializer,
                description=swagger_schema.descriptions['LectureView']['post'][200],
                examples=swagger_schema.examples['LectureView']['post'][200]
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['LectureView']['post']['description'],
        summary=swagger_schema.summaries['LectureView']['post'],
        tags=['lecture',],
        examples=[
            swagger_schema.examples['LectureView']['post']['input'],
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401]
        ],
    )
    def post(self, request):
        """Post lecture of school information
        
        Save lecture of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class LectureDetailView(APIView):
    model = Lecture
    serializer_class = LectureSerializer
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=LectureSerializer,
                description=swagger_schema.descriptions['LectureDetailView']['get'][200],
                examples=swagger_schema.examples['LectureDetailView']['get'][200]
            ),
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['LectureDetailView']['get']['description'],
        summary=swagger_schema.summaries['LectureDetailView']['get'],
        tags=['lecture',],
        examples=[
            basic_swagger_schema.examples[401]
        ],
    )
    def get(self, request, lecture_pk, school_pk):
        """Get lecture information
        
        Use school_pk and lecture_pk, return lecture of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=LectureSerializer,
                description=swagger_schema.descriptions['LectureDetailView']['put'][200],
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['LectureDetailView']['put']['description'],
        summary=swagger_schema.summaries['LectureDetailView']['put'],
        tags=['lecture',],
        examples=[
            swagger_schema.examples['LectureDetailView']['put']['input'],
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401]
        ],
    )
    def put(self, request, lecture_pk, school_pk):
        """Put lecture of school information
        
        Update lecture of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        serializer = LectureSerializer(instance=lecture, data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    @extend_schema(
        responses={
            204: OpenApiResponse(
                response=LectureSerializer,
                description=swagger_schema.descriptions['LectureDetailView']['delete'][204],
                examples=swagger_schema.examples['LectureDetailView']['delete'][204],
            ),
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404]
        },
        description=swagger_schema.descriptions['LectureDetailView']['delete']['description'],
        summary=swagger_schema.summaries['LectureDetailView']['delete'],
        tags=['lecture',],
        examples=[
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404]
        ],
    )
    def delete(self, request, lecture_pk, school_pk):
        """Delete lecture information
        
        Delete lecture information
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)