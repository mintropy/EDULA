from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from drf_spectacular.utils import (
    extend_schema, OpenApiResponse
)

from accounts.views.user import decode_JWT
from .models import Notification
from .serializers import NotificationSerializer
from . import swagger_schema

# Create your views here.
class NotificationPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class NotificationViewSet(ViewSet):
    """알림
    """
    model = Notification
    serializer_class = NotificationSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    pagination_class = NotificationPagination

    @extend_schema(
        description=swagger_schema.descriptions['NotificationViewSet']['list']['description'],
        summary=swagger_schema.summaries['NotificationViewSet']['list'],
        tags=['알림',],
    )
    def list(self, request):
        user = decode_JWT(request)
        if user is None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notifications = Notification.objects.filter(user=user.pk).order_by('-pk')
        paginaotr = NotificationPagination()
        serializer = NotificationSerializer(
            paginaotr.paginate_queryset(notifications, request),
            many=True
        )
        augmented_serializer = {
            'total_count': notifications.count(),
            'page_count': len(serializer.data),
            'notifications': serializer.data,
        }
        return Response(
            augmented_serializer,
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary=swagger_schema.summaries['NotificationViewSet']['partial_update'],
        tags=['알림',],
    )
    def partial_update(self, request, notification_pk):
        user = decode_JWT(request)
        if user is None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notification = get_object_or_404(Notification, pk=notification_pk)
        notification.read = not notification.read
        notification.save()
        serializer = NotificationSerializer(notification)
        return Response(
            serializer.data
        )

    @extend_schema(
        summary=swagger_schema.summaries['NotificationViewSet']['destroy'],
        tags=['알림',],
    )
    def destroy(self, request, notification_pk):
        user = decode_JWT(request)
        if user is None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notification = get_object_or_404(Notification, pk=notification_pk)
        notification.delete()
        return Response(
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        summary=swagger_schema.summaries['NotificationViewSet']['count'],
        tags=['알림',],
    )
    def count(self, request):
        user = decode_JWT(request)
        if user is None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(
            {
                'count': Notification.objects.filter(user=user.pk).count()
            },
            status=status.HTTP_200_OK
        )
