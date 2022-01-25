"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

base_api_url = 'api/'
api_version = ''

urlpatterns = [
    # APPs
    path(base_api_url + api_version + 'admin/', admin.site.urls),
    path(base_api_url + api_version + 'accounts/', include('accounts.urls')),
    path(base_api_url + api_version + 'schools/', include('schools.urls')),
    # JWT
    path(base_api_url + api_version + 'token/', TokenObtainPairView.as_view()),
    path(base_api_url + api_version + 'token/refresh/', TokenRefreshView.as_view()),
    # swagger
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
