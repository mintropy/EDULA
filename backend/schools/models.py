from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# from accounts.models import User
# Create your models here.

class School(models.Model):
    school_ID = models.IntegerField(primary_key=True)
    school_name = models.CharField(max_length=40)    
    
    
class Class(models.Model):
    class_ID = models.IntegerField(primary_key=True)
    # intergerfeild 범위 지정 ?
    grade = models.IntegerField(
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
    lecture_ID = models.IntegerField(primary_key=True)
    lecture_name = models.CharField(max_length=10)
    # 조정하기
    lecture_time_list = models.JSONField(max_length=10)
    user_list = models.ManyToManyField(
        'accounts.User',
        related_name="lecture_list",
        null=True,
        blank=True,
    )