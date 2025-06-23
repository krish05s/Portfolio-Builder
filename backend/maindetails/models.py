from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Main(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Work Experience
    company = models.CharField(max_length=100, blank=True, null=True)
    job = models.CharField(max_length=50, blank=True, null=True)
    experience = models.TextField(blank=True, null=True)


    # Linked In
    linkedin = models.TextField(max_length=300)

    # Education details

    # Edu - 1
    edu1_name = models.CharField(max_length=250)
    edu1_desc = models.TextField()

    # Edu - 2
    edu2_name = models.CharField(max_length=250)
    edu2_desc = models.TextField()

    # Edu - 3
    edu3_name = models.CharField(max_length=250)
    edu3_desc = models.TextField()

    
    # Project details

    # Project - 1
    project1_title = models.CharField(max_length=250, blank=True, null=True)
    project1_technology = models.CharField(max_length=300, blank=True, null=True)
    project1_desc = models.TextField(blank=True, null=True)

    # Project - 
    project2_title = models.CharField(max_length=250, blank=True, null=True)
    project2_technology = models.CharField(max_length=300, blank=True, null=True)
    project2_desc = models.TextField(blank=True, null=True)


    def __str__(self):
        return f"{self.company} | {self.job} | {self.linkedin}"
