from rest_framework import serializers
from .models import Image
from django.contrib.auth.models import User

class ImageSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # ✅ Required

    class Meta:
        model = Image
        fields = '__all__'
