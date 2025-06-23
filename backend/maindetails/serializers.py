from rest_framework import serializers
from .models import Main
from users.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class MainSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Main
        fields = '__all__'
