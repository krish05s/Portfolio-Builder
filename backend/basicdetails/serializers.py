from rest_framework import serializers
from .models import Basic
from users.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class BasicSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Basic
        fields = '__all__'

    def create(self, validated_data):
        print("VALIDATED DATA:", validated_data)  # 👈 Add this
        user_id = validated_data.pop('user')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")

        return Basic.objects.create(user=user, **validated_data)