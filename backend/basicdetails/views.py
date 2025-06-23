from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Basic
from .serializers import BasicSerializer

User = get_user_model()

class basicView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_user_and_basic(self, user_id):
        """Helper method to get user and their Basic instance."""
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None, None, Response({"error": "Invalid user ID"}, status=400)

        try:
            basic = Basic.objects.get(user=user)
        except Basic.DoesNotExist:
            return user, None, Response({"error": "Basic details not found"}, status=404)

        return user, basic, None

    def get(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        _, basic, error_response = self.get_user_and_basic(user_id)
        if error_response:
            return error_response

        serializer = BasicSerializer(basic)
        return Response(serializer.data, status=200)

    def post(self, request):
        user_id = request.data.get("user")
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=400)

        if Basic.objects.filter(user=user).exists():
            return Response({"error": "Basic details already exist for this user"}, status=400)

        serializer = BasicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required for update"}, status=400)

        user, basic, error_response = self.get_user_and_basic(user_id)
        if error_response:
            return error_response

        serializer = BasicSerializer(basic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
