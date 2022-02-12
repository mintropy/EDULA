from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import User


# Create your models here.
class Notification(models.Model):

    class NotificationType(models.TextChoices):
        FRIEND = 'FR', _('Friend')
        FRIEND_REQUEST = 'FQ', _('Friend Request')
        LECTURE = 'LE', _('Lecture')
        HOMEWORK = 'HO', _('Homework')
        ARTICLE = 'AR', _('Article')

    user = models.ForeignKey(
        User,
        related_name='notifications',
        on_delete=models.CASCADE,
    )
    notification_type = models.CharField(
        max_length=2,
        choices=NotificationType.choices,
    )
    content = models.CharField(
        max_length=50,
        null=True,
        blank=True,
    )
    from_user = models.ForeignKey(
        User,
        related_name='notifications_send',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    read = models.BooleanField(
        default=False
    )
