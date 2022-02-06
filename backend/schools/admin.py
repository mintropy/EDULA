from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import (
    School, Classroom, Lecture, 
    Homework, HomeworkSubmission
)
from accounts.models import SchoolAdmin, Teacher, Student

# Register your models here.
class SchoolAdminInline(admin.TabularInline):
    model = SchoolAdmin


class TeacherInline(admin.TabularInline):
    model = Teacher
    extra = 1


class StudentInline(admin.TabularInline):
    model = Student
    extra = 1


@admin.register(School)
class CustomSchoolAdmin(ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', 'school_admin', 'teacher', 'student')
    list_display_links = ('name',)
    inlines = [
        SchoolAdminInline, TeacherInline, StudentInline
    ]
    
    def school_admin(self, school):
        return school.school_admin
    def teacher(self, school):
        return f'{school.teacher_list.count()}명'
    def student(self, school):
        return f'{school.student_list.count()}명'

admin.site.register(Classroom)

@admin.register(Lecture)
class LectureAdmin(ModelAdmin):
    list_display = ('id', 'name', 'school', 'teacher', 'student')
    list_display_links = ('name',)
    
    def student(self, lecture):
        return f'{lecture.student_list.count()}명'


@admin.register(Homework)
class HomeworkAdmin(ModelAdmin):
    list_display = ('id', 'title', 'created_at', 'deadline',)
    list_display_links = ('title',)


@admin.register(HomeworkSubmission)
class HomeworkSubmissionAdmin(ModelAdmin):
    list_display = ('id', 'title', 'homework', 'writer', 'file_exist',)
    list_display_links = ('title',)
    
    @admin.display(
        boolean=True,
    )
    def file_exist(self, homework_submission):
        return True if homework_submission.file else False