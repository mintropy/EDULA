from django.urls import path
from . import views


urlpatterns = [
    path('<int:school_pk>/lecture/', views.LectureView.as_view()),
    path('<int:school_pk>/lecture/<int:lecture_pk>/', views.LectureDetailView.as_view()),
]
