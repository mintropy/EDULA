from django.urls import path
from . import views


urlpatterns = [
    path('lecture/', views.LectureView.as_view()),
    path('lecture/<int:lecture_pk>/', views.LectureDetailView.as_view()),
]
