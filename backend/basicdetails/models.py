from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Basic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    mobile = models.CharField(max_length=12)
    overview = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=30)
    zip = models.CharField(max_length=8)
    dob = models.CharField(max_length=12)
    age = models.CharField(max_length=3)
    email = models.EmailField()
    degree = models.CharField(max_length=20)
    bio = models.CharField(max_length=100)

    def __str__(self):
        return self.username