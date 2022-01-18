from operator import mod
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from schools.models import School, Classroom, Lecture

# Create your models here.
class User(AbstractUser):
    
    class Status(models.TextChoices):
        STUDENT = 'ST', _('Student')
        TEACHER = 'TE', _('Teacher')
        SCHOOLADMIN = 'SA', _('SchoolAdmin')
    
    phone = models.CharField(
        max_length=13,
        null=True,
        blank=True,
    )
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        null=True,
        blank=True,
    )


class Student(models.Model):
    guardian_phone = models.CharField(
        max_length=13,
        null=True,
        blank=True,
    )
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student',
        primary_key=True
    )
    school = models.ForeignKey(
        School, 
        related_name="student_list",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    classroom = models.ForeignKey(
        Classroom, 
        related_name="student_list",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )


class Teacher(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher',
        primary_key=True
    )
    school = models.ForeignKey(
        School, 
        related_name="teacher_list",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    classroom = models.OneToOneField(
        Classroom, 
        related_name="teacher",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )


class SchoolAdmin(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='school_admin',
        primary_key=True
    )
    school = models.OneToOneField(
        School, 
        related_name="school_admin",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )