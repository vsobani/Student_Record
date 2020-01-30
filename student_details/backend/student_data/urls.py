from django.urls import path ,include
from .views import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import StudentSerializer,StudentCreateSerializer

app_name = 'student_data'



urlpatterns = [
    path('students/', api_student_list_view, name='student-list-view'),
    # path('students/<int:pk>/', api_student_id_list_view, name= 'student-details-view'),
    path('students/create/', api_create_student_view, name = 'student-details-create'),
    path('students/<int:id>/delete/',api_delete_student_view,name='delete-student-field'),
    
]
