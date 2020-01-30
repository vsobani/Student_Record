from django.contrib import admin
from .models import Student

class StudentAdmin(admin.ModelAdmin):
    list_display = ('id','firstName','lastName','skills',)
    search_fields = ('firstName',)


admin.site.register(Student,StudentAdmin)

