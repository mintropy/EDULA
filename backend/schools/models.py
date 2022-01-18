from django.db import models

# Create your models here.

class School(models.Model):
    school_ID = models.IntegerField(primary_key=True)
    school_name = models.CharField(max_length=40)    
    
    
class Class(models.Model):
    class_ID = models.IntegerField(primary_key=True)
    grade = models.IntegerField(max_length=1)
    baan = models.IntegerField(max_length=3)
    school_ID = models.ForeignKey(
        School, 
        related_name="school", 
        on_delete=models.CASCADE, 
        db_column="school_ID") 
    
    
class Lecture(models.Model):
    lecture_ID = models.IntegerField(primary_key=True)
    lecture_name = models.CharField(max_length=10)
    lecture_time_list = models.JSONField(max_length=10)
    class_ID = models.ForeignKey(
        "Class", 
        related_name="class", 
        on_delete=models.CASCADE, 
        db_column="class_ID")
    school_ID = models.ForeignKey(
        "School", 
        related_name="school", 
        on_delete=models.CASCADE, 
        db_column="school_ID")