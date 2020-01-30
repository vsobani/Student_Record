from rest_framework import serializers
from .models import *


class StudentSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(source='skills_list')

    class Meta:
        model = Student
        fields = ('id','firstName','lastName', 'skills')

class StudentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id','firstName','lastName', 'skills')