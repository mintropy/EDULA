from re import I
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from .user import decode_JWT
from ..models import Student
from ..serializers.student import StudentSerializer


class StudentView(APIView):
    """Student View
    
    """
    model = Student
    serializer_class = StudentSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    def get(self, request, student_pk):
        """Get student inforamtion
        
        get student information by student_pk
        
        Parameters
        ----------
        student_pk : int
        
        Returns
        -------
        200 OK<br>
        'user': dict,
            detail information of user<br>
        'classroom': dict,
            detail information of classroom<br>
        'school': dict,
            detail information of school<br>
        'guardian_phone: str
        
        404 Not Fount,
            if user whose pk is not a student
        """
        student = get_object_or_404(Student, pk=student_pk)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    
    def put(self, request, student_pk):
        """Update student information
        
        update student information<br>
        Only one's own self profile could be chaged
        
        Parameters
        ----------
        student_pk : int
        
        Request Head
        ------------
        JWT : str
        
        Request Body
        ------------
        user : dict
        classroom : dict
        school : dict
        guardian_phone : str
        
        Returns
        -------
        200 OK<br>
        'user': dict,
            detail information of user<br>
        'guardian_phone: str
        
        400 Bad Request<br>
            if data is wrong
        
        401 Unauthorized<br>
            unauthorized user or not own self profile
        
        404 Not Fount<br>
            if user whose pk is not a student
        """
        user = decode_JWT(request)
        student = get_object_or_404(Student, pk=student_pk)
        if student.user.pk != user.pk:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = {
            'user': {
                'id': user.pk,
                'email': request.data['user']['email'],
                'phone': request.data['user']['phone'],
            },
            'guardian_phone': request.data['guardian_phone'],
        }
        serializer = StudentSerializer(student, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
