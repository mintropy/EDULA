from django.urls import path
from .views import classroom, lecture, student, teacher, homework


homework_list = homework.HomeworkViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
homework_detail = homework.HomeworkViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy',
})


urlpatterns = [
    # 수업
    path('<int:school_pk>/lecture/', lecture.LectureView.as_view()),
    path('<int:school_pk>/lecture/<int:lecture_pk>/', lecture.LectureDetailView.as_view()),
    # 유저
    path('<int:school_pk>/student/', student.StudentView.as_view()),
    path('<int:school_pk>/teacher/', teacher.TeacherView.as_view()),
    path('<int:school_pk>/classroom/<int:classroom_pk>/student/', student.ClassroomStudentView.as_view()),
    # 교실
    path('<int:school_pk>/classroom/', classroom.ClassroomView.as_view()),
    # 숙제
    # path('<int:lecture_pk>/homework/',homework.HomeworkView.as_view()),
    path('<int:lecture_pk>/homework/', homework_list),
    # path('<int:lecture_pk>/homework/<int:homework_pk>/',homework.HomeworkDetailView.as_view()),
    path('<int:lecture_pk>/homework/<int:homework_pk>/',homework_detail),
]