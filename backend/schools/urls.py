from django.urls import path
from .views import classroom, lecture, student, teacher


urlpatterns = [
    path('<int:school_pk>/lecture/', lecture.LectureView.as_view()),
    path('<int:school_pk>/lecture/<int:lecture_pk>/', lecture.LectureDetailView.as_view()),
    
    path('<int:school_pk>/student/', student.StudentView.as_view()),
    path('<int:school_pk>/teacher/', teacher.TeacherView.as_view()),
    
    path('<int:school_pk>/classroom/', classroom.ClassroomView.as_view()),
    path('<int:school_pk>/classroom/<int:classroom_pk>/student/', student.ClassroomStudentView.as_view()),
]
