from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Student,Teacher,SchoolAdmin

# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'status',)


admin.site.register(User, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(SchoolAdmin)