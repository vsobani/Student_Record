from django.db import models

class Student(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    skills = models.CharField(max_length=100)

    def __str__(self):
        return self.firstName

    def skills_list(self):
        return list(str(self.skills).split(','))