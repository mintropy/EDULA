from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

class School(models.Model):
    name = models.CharField(max_length=40)
    abbreviation = models.CharField(
        max_length=10,
        unique=True,
    )
    
    def __str__(self):
        return self.name


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
    
    def __str__(self):
        return f'{self.school} {self.class_grade}학년 {self.class_num}반'


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
    
    def __str__(self):
        return f'{self.school} {self.name}'


class Homework(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    writer = models.ForeignKey(
        'accounts.User',
        related_name='homework_list',
        on_delete=models.CASCADE,
    )
    lecture = models.ForeignKey(
        Lecture,
        related_name="homework_list",
        on_delete=models.CASCADE,
    )
    
    def __str__(self):
        return self.title
