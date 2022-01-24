from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .user import decode_JWT
from ..models import Teacher
from ..serializers import TeacherSerializer


class TeacherView(APIView):
    model = Teacher
    serializer_class = TeacherSerializer
    
    def get(self, request, teacher_pk):
        """Get teacher inforamtion
        
        get teacher information by teacher_pk
        
        Parameters
        ----------
        teacher_pk : int
        
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
            if user whose pk is not a teacher
        """
        teacher = get_object_or_404(Teacher, pk=teacher_pk)
        serializer = TeacherSerializer(teacher)
        return Response(serializer.data)
    
    def put(self, request, teacher_pk):
        """Update teacher information
        
        update teacher information<br>
        Only one's own self profile could be chaged
        
        Parameters
        ----------
        teacher_pk : int
        
        Request Head
        ------------
        JWT : str
        
        Request Body
        ------------
        user : dict
        classroom : dict
        school : dict
        
        Returns
        -------
        200 OK<br>
        'user': dict,
            detail information of user<br>
        
        400 Bad Request<br>
            if data is wrong
        
        401 Unauthorized<br>
            unauthorized user or not own self profile
        
        404 Not Fount<br>
            if user whose pk is not a teacher
        """
        user = decode_JWT(request)
        teacher = get_object_or_404(Teacher, pk=teacher_pk)
        if teacher.user.pk != user.pk:
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
        }
        serializer = TeacherSerializer(teacher, data=data)
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
