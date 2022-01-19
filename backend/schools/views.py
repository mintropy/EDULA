from django.shortcuts import get_list_or_404, get_object_or_404
from .models import (
    School, Classroom, Lecture
)
from accounts.models import User, Student, Teacher
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import LectureSerializer, StudentSerializer, TeacherSerializer

class LectureView(APIView):
    model = Lecture
    
    def get(self, request,school_pk):
        articles = Lecture.objects.filter(school_id=school_pk)
        serializer = LectureSerializer(articles, many=True)  
        return Response(serializer.data)
    
    def post(self, request,*arg, **kwargs):
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class LectureDetailView(APIView):
    model = Lecture
    
    def get(self, request, lecture_pk, school_pk):
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        # student = Student.objects.get(pk=student_pk)
        serializer = LectureSerializer(lecture)
        return Response(serializer.data)

    def put(self, request, lecture_pk, school_pk):
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        serializer = LectureSerializer(instance=lecture, data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, lecture_pk, school_pk):
        lecture = get_object_or_404(Lecture, pk=lecture_pk, school_id=school_pk)
        lecture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StudentView(APIView):
    model = Student
    def get(self, request,school_pk):
        articles = Student.objects.filter(school_id=school_pk)
        serializer = StudentSerializer(articles, many=True)  
        return Response(serializer.data)
    

class TeacherView(APIView):
    model = Teacher
    
    def get(self, request,school_pk):
        articles = Teacher.objects.filter(school_id=school_pk)
        serializer = TeacherSerializer(articles, many=True)  
        return Response(serializer.data)