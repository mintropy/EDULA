from django.shortcuts import get_list_or_404, get_object_or_404, render

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from drf_spectacular.utils import (
    extend_schema, OpenApiResponse
)

from accounts.views.user import decode_JWT
from .models import Notification
from .serializers import NotificationSerializer

# Create your views here.
class NotificationViewSet(ViewSet):
    """알림
    """
    model = Notification
    serializer_class = NotificationSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]

    def list(self, request):
        user = decode_JWT(request)
        if user is None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notifications = get_list_or_404(Notification, user=user.pk)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def retireve(self, request, notification_pk):
        user = decode_JWT(request)
        if user is None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notification = get_object_or_404(Notification, pk=notification_pk)
        serializer = NotificationSerializer(notification)
        return Response(
            serializer.data
        )
