from django.contrib import admin

# Register your models here.
from .models import School, Class, Lecture
# Register your models here.
admin.site.register(School)
admin.site.register(Class)
admin.site.register(Lecture)