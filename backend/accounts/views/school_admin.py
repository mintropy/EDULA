from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from .user import decode_JWT
from ..models import SchoolAdmin
from ..serializers import SchoolAdminSerializer


class SchoolAdminView(APIView):
    model = SchoolAdmin
    serializer_class = SchoolAdminSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    def get(self, request, school_admin_pk):
        """Get school admin inforamtion
        
        get school admin information by school_admin_pk<br>
        only school admin could access
        
        Parameters
        ----------
        school_admin_pk : int
        
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
        
        401 Unauthorized<br>
            unauthorized user or not own self profile
        
        
        404 Not Fount,
            if user whose pk is not a school admin
        """
        user = decode_JWT(request)
        school_admin = get_object_or_404(SchoolAdmin, pk=school_admin_pk)
        if user != school_admin:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = SchoolAdminSerializer(school_admin)
        return Response(serializer.data)
    
    def put(self, request, school_admin_pk):
        """Update school admin information
        
        update school admin information<br>
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
            if user whose pk is not a school admin
        """
        user = decode_JWT(request)
        school_admin = get_object_or_404(SchoolAdmin, pk=school_admin_pk)
        if school_admin.user.pk != user.pk:
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
        serializer = SchoolAdminSerializer(school_admin, data=data)
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
