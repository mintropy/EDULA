from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.
class User(AbstractUser):
    
    class Status(models.TextChoices):
        STUDENT = 'ST', _('Student')
        TEACHER = 'TE', _('Teacher')
        SCHOOLADMIN = 'SA', _('SchoolAdmin')
    
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        null=True,
        blank=True,
    )


class Student(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student',
        primary_key=True
    )


class Teacher(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher',
        primary_key=True
    )


class SchoolAdmin(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='school_admin',
        primary_key=True
    )