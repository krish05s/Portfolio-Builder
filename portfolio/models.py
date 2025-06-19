from django.db import models

# Create your models here.

class Image(models.Model):
    profile = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    cover_image = models.ImageField(upload_to='cover_images/', null=True, blank=True)

    def __str__(self):
        return f"PortfolioImage {self.id}"

