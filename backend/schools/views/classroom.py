from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from accounts.views.user import decode_JWT
from . import swagger_schema
from ..models import Classroom
from ..serializers import ClassroomSerializer
from server import basic_swagger_schema


class ClassroomView(APIView):
    """Classroom
    
    """
    model = Classroom
    serializer_class = ClassroomSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=ClassroomSerializer,
                description=swagger_schema.descriptions['ClassroomView']['get'][200],
                examples=swagger_schema.examples['ClassroomView']['get'][200]
            ),
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['ClassroomView']['get']['description'],
        summary=swagger_schema.summaries['ClassroomView']['get'],
        tags=['classroom','schooladmin'],
        examples=[
            basic_swagger_schema.examples[401]
        ],
    )
    def get(self, request,school_pk):
        """Get total classroom of school information
        
        Use school_pk, return total classroom of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        classrooms = Classroom.objects.filter(school_id=school_pk)
        serializer = ClassroomSerializer(classrooms, many=True)  
        return Response(serializer.data)
    
    @extend_schema(
        responses={
            201: OpenApiResponse(
                response=ClassroomSerializer,
                description=swagger_schema.descriptions['ClassroomView']['post'][201],
                examples=swagger_schema.examples['ClassroomView']['post'][201]
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401]
        },
        description=swagger_schema.descriptions['ClassroomView']['post']['description'],
        summary=swagger_schema.summaries['ClassroomView']['post'],
        tags=['classroom','schooladmin'],
        examples=[
            swagger_schema.examples['ClassroomView']['post']['input'],
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401]
        ],
    )
    def post(self, request):
        """Post classroom of school information
        
        Save classroom of school infromation
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = ClassroomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

