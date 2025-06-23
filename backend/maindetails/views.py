from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Main
from .serializers import MainSerializer

User = get_user_model()

class mainView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_user_and_main(self, user_id):
        """Helper method to get user and their Main instance."""
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None, None, Response({"error": "Invalid user ID"}, status=400)

        try:
            main = Main.objects.get(user=user)
        except Main.DoesNotExist:
            return user, None, Response({"error": "Main details not found"}, status=404)

        return user, main, None

    def get(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        _, main, error_response = self.get_user_and_main(user_id)
        if error_response:
            return error_response

        serializer = MainSerializer(main)
        return Response(serializer.data, status=200)

    def post(self, request):
        user_id = request.data.get("user")
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=400)

        if Main.objects.filter(user=user).exists():
            return Response({"error": "Main details already exist for this user"}, status=400)

        serializer = MainSerializer(data=request.data)
        if serializer.is_valid():
            print("VALIDATED DATA:", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required for update"}, status=400)

        user, main, error_response = self.get_user_and_main(user_id)
        if error_response:
            return error_response

        serializer = MainSerializer(main, data=request.data, partial=True)
        if serializer.is_valid():
            print("VALIDATED DATA:", serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
