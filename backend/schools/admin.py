from django.contrib import admin

# Register your models here.
from .models import School, Classroom, Lecture
# Register your models here.
admin.site.register(School)
admin.site.register(Classroom)
admin.site.register(Lecture)