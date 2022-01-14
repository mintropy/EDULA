from django.urls import path
from . import views

urlpatterns = [
    path('student/<int:student_pk>/', views.StudentView.as_view())
]
