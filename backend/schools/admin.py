from django.contrib import admin
from .models import School, Classroom, Lecture

# Register your models here.
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation',)


admin.site.register(School, SchoolAdmin)
admin.site.register(Classroom)
admin.site.register(Lecture)