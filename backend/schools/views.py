from django.shortcuts import get_list_or_404, get_object_or_404
from .models import (
    School, Classroom, Lecture
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import LectureSerializer

class LectureView(APIView):
    model = Lecture
    
    def get(self, request):
        articles = Lecture.objects.filter(active=True)
        serializer = LectureSerializer(articles, many=True)  
        # many => queryset에 대응. many 없으면 instance 1개가 올 것으로 기대하고 있어 에러 발생함.
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class LectureDetailView(APIView):
    model = Lecture
    
    def get(self, request, lecture_pk):
        student = get_object_or_404(Lecture, pk=lecture_pk)
        # student = Student.objects.get(pk=student_pk)
        serializer = LectureSerializer(student)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LectureSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
