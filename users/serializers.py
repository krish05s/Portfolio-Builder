from rest_framework import serializers
from django.contrib.auth.models import User



# class RegisterSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(write_only = True)
#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password', 'password2')


#     def validate(self, data):
#         if data['password'] != data['password2']:
#             raise serializers.ValidationError("Password must match")
#         return data
    
#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username = validated_data['username'],
#             email = validated_data['email'],
#             password = validated_data['password'],
#         )
#         return user
    

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


