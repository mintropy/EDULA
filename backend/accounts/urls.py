from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path
from . import views


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('student/<int:student_pk>/', views.StudentView.as_view()),
    
    path('profile/password/change/', views.PasswordChangeView.as_view())
    # path('profile/password/find/', views.PasswordView.as_view())
]
