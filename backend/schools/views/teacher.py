from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from accounts.models import Teacher
from ..serializers import TeacherSerializer


class TeacherView(APIView):
    model = Teacher
    serializer_class = TeacherSerializer
    permission_classes  = [IsAuthenticated]
    
    def get(self, request,school_pk):
        """Get total teacher of school information
        
        Use school_pk, return total teacher of school infromation
        
        Request Head
        ------------
        school_pk : int
        
        Returns
        -------
        200 OK<br>
        teachers : list,
            total teacher list of school<br>
        """
        teachers = Teacher.objects.filter(school_id=school_pk)
        serializer = TeacherSerializer(teachers, many=True)  
        return Response(serializer.data)