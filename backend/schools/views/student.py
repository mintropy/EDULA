from django.shortcuts import get_list_or_404, get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from accounts.views.user import decode_JWT
from . import swagger_schema
from accounts.models import Student
from accounts.serializers import StudentSerializer
from server import basic_swagger_schema


class StudentView(APIView):
    model = Student
    serializer_class = StudentSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=StudentSerializer,
                description=swagger_schema.descriptions['StudentView']['get'][200],
                examples=swagger_schema.examples['StudentView']['get'][200]
            ),
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['StudentView']['get']['description'],
        summary=swagger_schema.summaries['StudentView']['get'],
        tags=['school','student'],
        examples=[
            basic_swagger_schema.examples[401]
        ],
    )
    def get(self, request,school_pk):
        """Get total student of school information
        
        Use school_pk, return total student of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        students = Student.objects.filter(school_id=school_pk)
        serializer = StudentSerializer(students, many=True)  
        return Response(serializer.data)
    

class ClassroomStudentView(APIView):
    model = Student
    serializer_class = StudentSerializer
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=StudentSerializer,
                description=swagger_schema.descriptions['ClassroomStudentView']['get'][200],
                examples=swagger_schema.examples['ClassroomStudentView']['get'][200]
            ),
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['ClassroomStudentView']['get']['description'],
        summary=swagger_schema.summaries['ClassroomStudentView']['get'],
        tags=['classroom','student'],
        examples=[
            basic_swagger_schema.examples[401]
        ],
    )
    def get(self, request,school_pk,classroom_pk):
        """Get classroom student information
        
        Use school_pk and classroom_pk, return classroom student infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        students = Student.objects.filter(school_id=school_pk,classroom_id=classroom_pk)
        serializer = StudentSerializer(students, many=True)  
        return Response(serializer.data)