from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import User

# Create your views here.

class RegisterView(APIView):

    def get(self, request):
        data = request.query_params  # data from URL query parameters
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
           user = serializer.save()
           return Response({
                "message": "User created successfully",
                "id": user.id,
                "status": True,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def post(self, request):
        data = request.data  # data from POST body
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User created successfully",
                "id": user.id,
                "status": True,
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@csrf_exempt
@api_view(['GET', 'POST'])  # Correctly written as a list of strings
def login_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": "Login successful", "id": user.id,}, status=200)
        return Response({"error": "Invalid credentials"}, status=400)

    elif request.method == 'GET':
        # Accepting credentials via query parameters (e.g., ?username=krish&password=1234)
        username = request.GET.get('username')
        password = request.GET.get('password')

        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": "Login successful", "id": user.id}, status=200)
        return Response({"error": "Invalid credentials"}, status=400)

    return Response({"error": "Unsupported request method"}, status=405)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(serializer.data, status=200)
    
    def post(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(serializer.data, status=200)

