from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path
from .views import user, student, teacher, school_admin


urlpatterns = [
    # JWT token
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    # User Information
    path('', user.UserView.as_view()),
    path('student/<int:student_pk>/', student.StudentView.as_view()),
    path('teacher/<int:teacher_pk>/', teacher.TeacherView.as_view()),
    path('school-admin/<int:school_admin_pk>/', school_admin.SchoolAdminView.as_view()),
    
    # Password
    path('profile/password/change/', user.PasswordChangeView.as_view()),
    path('profile/password/reset/', user.PasswordResetView.as_view()),
]
