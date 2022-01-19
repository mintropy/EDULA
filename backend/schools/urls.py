from django.urls import path
from . import views


urlpatterns = [
    path('<int:school_pk>/lecture/', views.LectureView.as_view()),
    path('<int:school_pk>/lecture/<int:lecture_pk>/', views.LectureDetailView.as_view()),
    
    path('<int:school_pk>/student/', views.StudentView.as_view()),
    path('<int:school_pk>/teacher/', views.TeacherView.as_view()),
]
