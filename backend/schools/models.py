from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

class School(models.Model):
    name = models.CharField(max_length=40)    


class Classroom(models.Model):
    class_grade = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(6)
        ]
    )
    class_num = models.IntegerField()
    school = models.ForeignKey(
        School, 
        related_name="class_list",
        on_delete=models.CASCADE,
    ) 


class Lecture(models.Model):
    name = models.CharField(max_length=10)
    time_list = models.JSONField()
    school = models.ForeignKey(
        School, 
        related_name="lecture_list",
        on_delete=models.CASCADE,
    )
    teacher = models.ForeignKey(
        'accounts.Teacher',
        related_name="lecture_list",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    student_list = models.ManyToManyField(
        'accounts.Student',
        related_name="lecture_list",
    )
