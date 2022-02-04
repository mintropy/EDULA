from django.contrib import admin
from django.contrib.admin import ModelAdmin 
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Teacher, SchoolAdmin, FriendRequest

# Register your models here.
class StudentInline(admin.TabularInline):
    model = Student


class TeacherInline(admin.TabularInline):
    model = Teacher


class SchoolAdminInline(admin.TabularInline):
    model = SchoolAdmin


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('id', 'username', 'first_name', 'status')
    fieldsets = UserAdmin.fieldsets + (
        ('Custom fields', {'fields': ('status', 'friend_list',)}),
    )
    list_display_links = ('username',)
    list_filter = ('status', )
    inlines = [
        StudentInline, TeacherInline, SchoolAdminInline,
    ]


@admin.register(FriendRequest)
class FriendRequestAdmin(ModelAdmin):
    # model = FriendRequest
    list_display = ('id', 'request_status', 'from_user_detail', 'to_user_detail')
    list_display_links = ('request_status',)
    list_filter = ('request_status',)
    fields = (('from_user', 'to_user'), 'request_status',)
    
    def from_user_detail(self, request):
        return f'id: {request.from_user.pk} / username: {request.from_user}'
    
    def to_user_detail(self, request):
        return f'id: {request.to_user.pk} / username: {request.to_user}'


admin.site.register(User, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(SchoolAdmin)
# admin.site.register(FriendRequest, FriendRequestAdmin)