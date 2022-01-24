from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from accounts.views.user import decode_JWT
from ..models import Homework
from ..serializers import HomeworkSerializer


class HomeworkView(APIView):
    model = Homework
    serializer_class = HomeworkSerializer
    
    
    def get(self, request,lecture_pk):
        """Get total classroom of school information
        
        Use school_pk, return total classroom of school infromation
        
        Request Head
        ------------
        school_pk : int
        
        Returns
        -------
        200 OK<br>
        classroom : list,
            total classroom list of school<br>
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homeworks = Homework.objects.filter(lecture_id=lecture_pk)
        serializer = HomeworkSerializer(homeworks, many=True)  
        return Response(serializer.data)
    
    def post(self,request,lecture_pk):
        """Post homework information
        
        Save homework infromation
        
        Request Head
        ------------
        title : str,
            제목<br>
        content : str,
            제목<br>
        deadline : datetime,
            마감 시간<br>
        writer_pk : int,
            작성자 pk<br>
        writer_name : str
            작성자 이름<br>
        
        Returns
        -------
        201 Created<br>
        homework : dict,
            <br>
        
        400 Bad Request
        """
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
    model = Homework
    serializer_class = HomeworkSerializer
    
    def get(self, request, lecture_pk, homework_pk):
        """Get homework information
        
        Use homework_pk and lecture_pk, return homework of lecture infromation
        
        Request Head
        ------------
        homework_pk : int,<br>
        lecture_pk : int
        
        Returns
        -------
        200 OK<br>
        homework : dict,
            homework of lecture<br>
            
        404 Not Found
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

    def put(self, request, lecture_pk, homework_pk):
        """Put homework of lecture information
        
        Update homework of lecture infromation
        
        Request Head
        ------------
        homework_pk : int,
            <br>
        lecture_pk : int,
            <br>
        title : str,
            제목<br>
        content : str,
            제목<br>
        deadline : datetime,
            마감 시간<br>
        
        Returns
        -------
        201 Created<br>
        homework : dict,
            homework of lecture<br>
        
        400 Bad Request
        """
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        homework = get_object_or_404(Homework, lecture_id=lecture_pk, id=homework_pk)
        serializer = HomeworkSerializer(instance=homework, data=request.data)
        print(serializer)
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