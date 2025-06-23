from django.db import models
from django.contrib.auth.models import User

class Image(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    cover_image = models.ImageField(upload_to='cover_images/', null=True, blank=True)

    def __str__(self):
        return f"PortfolioImage {self.user.username}"