from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from ..models import Lecture
from ..serializers import LectureSerializer


class LectureView(APIView):
    model = Lecture
    serializer_class = LectureSerializer
    permission_classes  = [IsAuthenticated]
    
    def get(self, request,school_pk):
        """Get total lecture of school information
        
        Use school_pk, return total lecture of school infromation
        
        Request Head
        ------------
        school_pk : int
        
        Returns
        -------
        200 OK<br>
        lectures : list,
            total lecture list of school<br>
        """
        lectures = Lecture.objects.filter(school_id=school_pk)
        serializer = LectureSerializer(lectures, many=True)  
        return Response(serializer.data)
    
    def post(self, request,*arg, **kwargs):
        """Post lecture of school information
        
        Save lecture of school infromation
        
        Request Head
        ------------
        name : string,
            lecture name<br>
        time_list : list,
            lecture time<br>
            &nbsp;&nbsp;element : dict 
                (day : 요일, st : 시작시간, ed : 종료시간)<br> 
        school: int,
            school number<br>
        teacher: int,
            teacher number of lecture<br>
        student_list : list,
            students in lecture<br>
            &nbsp;&nbsp;element : int
                student number<br>
        
        Returns
        -------
        201 Created<br>
        lectures : list,
            total lecture list of school<br>
        
        400 Bad Request
        """
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class LectureDetailView(APIView):
    model = Lecture
    serializer_class = LectureSerializer
    permission_classes  = [IsAuthenticated]
    
    def get(self, request, lecture_pk, school_pk):
        """Get lecture information
        
        Use school_pk and lecture_pk, return lecture of school infromation
        
        Request Head
        ------------
        school_pk : int,<br>
        lecture_pk : int
        
        Returns
        -------
        200 OK<br>
        lectures : dict,
            lecture of school<br>
            
        404 Not Found
        """
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)

    def put(self, request, lecture_pk, school_pk):
        """Put lecture of school information
        
        Update lecture of school infromation
        
        Request Head
        ------------
        school_pk : int,
            <br>
        lecture_pk : int,
            <br>
        name : string,
            lecture name<br>
        time_list : list,
            lecture time<br>
            &nbsp;&nbsp;element : dict 
                (day : 요일, st : 시작시간, ed : 종료시간)<br> 
        school: int,
            school number<br>
        teacher: int,
            teacher number of lecture<br>
        student_list : list,
            students in lecture<br>
            &nbsp;&nbsp;element : int
                student number<br>
        
        Returns
        -------
        201 Created<br>
        lectures : list,
            total lecture list of school<br>
        
        400 Bad Request
        """
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        serializer = LectureSerializer(instance=lecture, data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, lecture_pk, school_pk):
        """Delete lecture information
        
        Delete lecture information
        
        Request Head
        ------------
        school_pk : int,<br>
        lecture_pk : int
        
        Returns
        -------
        204 OK<br>
            
        404 Not Found
        """
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)