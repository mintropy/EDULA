from django.urls import path

from .views import NotificationViewSet


notification_list = NotificationViewSet.as_view({
    'get': 'list',
})
notification_detail = NotificationViewSet.as_view({
    'patch': 'partial_update',
    'delete': 'destroy',
})
notification_count = NotificationViewSet.as_view({
    'get': 'count',
})

urlpatterns = [
    path(
        '',
        notification_list,
    ),
    path(
        '<int:notification_pk>/',
        notification_detail,
    ),
    path(
        'count/',
        notification_count,
    )
]
