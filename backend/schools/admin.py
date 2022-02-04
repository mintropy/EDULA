from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import School, Classroom, Lecture
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

# admin.site.register(School)
admin.site.register(Classroom)
admin.site.register(Lecture)