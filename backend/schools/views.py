from django.shortcuts import get_list_or_404, get_object_or_404
from .models import (
    School, Classroom, Lecture
)
from accounts.models import User, Student, Teacher
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import LectureSerializer, StudentSerializer, TeacherSerializer, ClassroomSerializer

class LectureView(APIView):
    """Get total lecture information.
    
    """
    model = Lecture
    
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
    """Lecture get, update, delete
    
    """
    model = Lecture
    
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


class StudentView(APIView):
    """Get student information.
    
    """
    model = Student
    def get(self, request,school_pk):
        """Get total student of school information
        
        Use school_pk, return total student of school infromation
        
        Request Head
        ------------
        school_pk : int
        
        Returns
        -------
        200 OK<br>
        students : list,
            total student list of school<br>
        """
        students = Student.objects.filter(school_id=school_pk)
        serializer = StudentSerializer(students, many=True)  
        return Response(serializer.data)
    

class TeacherView(APIView):
    """Get teacher information.
    
    """
    model = Teacher
    
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


class ClassroomView(APIView):
    """Get total classroom information.
    
    """
    model = Classroom
    serializer_class = ClassroomSerializer
    
    def get(self, request,school_pk):
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
        classrooms = Classroom.objects.filter(school_id=school_pk)
        serializer = ClassroomSerializer(classrooms, many=True)  
        return Response(serializer.data)
    
    def post(self, request,*arg, **kwargs):
        """Post classroom of school information
        
        Save classroom of school infromation
        
        Request Head
        ------------
        class_grade : int,
            학년<br>
        class_num : int,
            반<br>
        school : int,
            학교<br>
        
        Returns
        -------
        201 Created<br>
        classroomS : list,
            classrooms list of school<br>
        
        400 Bad Request
        """
        serializer = ClassroomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class ClassroomStudentView(APIView):
    """Get classroom student information.
    
    """
    model = Student
    def get(self, request,school_pk,classroom_pk):
        """Get classroom student information
        
        Use school_pk and classroom_pk, return classroom student infromation
        
        Request Head
        ------------
        school_pk : int<br>
        classroom_pk : int
        
        Returns
        -------
        200 OK<br>
        students : list,
            classroom student list<br>
        """
        students = Student.objects.filter(school_id=school_pk,classroom_id=classroom_pk)
        serializer = StudentSerializer(students, many=True)  
        return Response(serializer.data)