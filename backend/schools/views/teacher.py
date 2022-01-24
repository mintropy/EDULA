from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from accounts.views.user import decode_JWT
from accounts.models import Teacher
from accounts.serializers import TeacherSerializer


class TeacherView(APIView):
    model = Teacher
    serializer_class = TeacherSerializer
    
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
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        teachers = Teacher.objects.filter(school_id=school_pk)
        serializer = TeacherSerializer(teachers, many=True)  
        return Response(serializer.data)