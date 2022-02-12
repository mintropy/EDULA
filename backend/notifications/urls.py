from django.urls import path

from .views import NotificationViewSet


notification_list = NotificationViewSet.as_view({
    'get': 'list',
})
notification_detail = NotificationViewSet.as_view({
    'get': 'retireve',
})

urlpatterns = [
    path(
        '',
        notification_list,
    ),
    path(
        '<int:notification_pk>/',
        notification_detail,
    )
]

