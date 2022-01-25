from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from accounts.views.user import decode_JWT
from . import swagger_schema
from ..models import Homework
from ..serializers import HomeworkSerializer


class HomeworkView(APIView):
    """Homework
    
    """
    model = Homework
    serializer_class = HomeworkSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkView']['get'][200],
                examples=swagger_schema.examples['HomeworkView']['get'][200]
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['HomeworkView']['get'][401],
                description=swagger_schema.descriptions['HomeworkView']['get'][401],
            )
        },
        description=swagger_schema.descriptions['HomeworkView']['get']['description'],
        summary=swagger_schema.summaries['HomeworkView']['get'],
        tags=['homework',],
        examples=[
            swagger_schema.examples['HomeworkView']['get'][401]
        ],
    )
    def get(self, request,lecture_pk):
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
            200: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkView']['post'][200],
                examples=swagger_schema.examples['HomeworkView']['post'][200]
            ),
            400: OpenApiResponse(
                response=swagger_schema.schema_serializers['HomeworkView']['post'][400],
                description=swagger_schema.descriptions['HomeworkView']['post'][400],
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['HomeworkView']['post'][401],
                description=swagger_schema.descriptions['HomeworkView']['post'][401],
            )
        },
        description=swagger_schema.descriptions['HomeworkView']['post']['description'],
        summary=swagger_schema.summaries['HomeworkView']['post'],
        tags=['homework',],
        examples=[
            swagger_schema.examples['HomeworkView']['post']['input'],
            swagger_schema.examples['HomeworkView']['post'][400],
            swagger_schema.examples['HomeworkView']['post'][401]
        ],
    )
    def post(self,request,lecture_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = request.data
        new_data = {
            "title": data.get('title'),
            "content": data.get('content'),
            "deadline": data.get('deadline'),
            "writer_pk": user.pk,
            "writer_name": user.username,
            "lecture":lecture_pk
        }
        serializer = HomeworkSerializer(data=new_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    
class HomeworkDetailView(APIView):
    """Homework detail
    
    """
    model = Homework
    serializer_class = HomeworkSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkDetailView']['get'][200],
                examples=swagger_schema.examples['HomeworkDetailView']['get'][200]
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['HomeworkDetailView']['get'][401],
                description=swagger_schema.descriptions['HomeworkDetailView']['get'][401],
            )
        },
        description=swagger_schema.descriptions['HomeworkDetailView']['get']['description'],
        summary=swagger_schema.summaries['HomeworkDetailView']['get'],
        tags=['homework',],
        examples=[
            swagger_schema.examples['HomeworkDetailView']['get'][401]
        ],
    )
    def get(self, request, lecture_pk, homework_pk):
        """Get homework information
        
        Use homework_pk and lecture_pk, return homework of lecture infromation
        """
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
            200: OpenApiResponse(
                response=HomeworkSerializer,
                description=swagger_schema.descriptions['HomeworkDetailView']['put'][200],
            ),
            400: OpenApiResponse(
                response=swagger_schema.schema_serializers['HomeworkDetailView']['put'][400],
                description=swagger_schema.descriptions['HomeworkDetailView']['put'][400],
            ),
            401: OpenApiResponse(
                response=swagger_schema.schema_serializers['HomeworkDetailView']['put'][401],
                description=swagger_schema.descriptions['HomeworkDetailView']['put'][401],
            ),
        },
        description=swagger_schema.descriptions['HomeworkDetailView']['put']['description'],
        summary=swagger_schema.summaries['HomeworkDetailView']['put'],
        tags=['homework',],
        examples=[
            swagger_schema.examples['HomeworkDetailView']['put']['input'],
            swagger_schema.examples['HomeworkDetailView']['put'][400],
            swagger_schema.examples['HomeworkDetailView']['put'][401],
        ],
    )
    def put(self, request, lecture_pk, homework_pk):
        """Put homework information
        
        Update homework infromation
        """
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

    def delete(self, request, lecture_pk, homework_pk):
        """Delete homework information
        
        Delete homework information
        
        Request Head
        ------------
        homework_pk : int,<br>
        lecture_pk : int
        
        Returns
        -------
        204 OK<br>
            
        404 Not Found
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homework = get_object_or_404(Homework, lecture_id=lecture_pk, id=homework_pk)
        homework.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)