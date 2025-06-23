from django.http import HttpResponse, JsonResponse
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from basicdetails.models import Basic
from maindetails.models import Main
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Image
from .serializers import ImageSerializer
from django.contrib.auth.models import User
import base64

class ImageAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        try:
            image = Image.objects.get(user__id=user_id)
            serializer = ImageSerializer(image)
            return Response(serializer.data, status=200)
        except Image.DoesNotExist:
            return Response({"error": "Image not found for user"}, status=404)

    def post(self, request):
        user_id = request.data.get("user")
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        try:
            print("DEBUG user_id from request:", request.data.get("user"))
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=400)

        if Image.objects.filter(user=user).exists():
            return Response({"error": "Images already exist for this user"}, status=400)

        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        try:
            user = User.objects.get(id=user_id)
            image = Image.objects.get(user=user)
        except (User.DoesNotExist, Image.DoesNotExist):
            return Response({"error": "User or image not found"}, status=404)

        serializer = ImageSerializer(image, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


def download_static_page(request, user_id):
    try:
        # Check if Basic and Main details exist
        basic = Basic.objects.get(user__id=user_id)
        main = Main.objects.get(user__id=user_id)
    except Basic.DoesNotExist:
        return JsonResponse({"error": "Basic details not found. Please complete your profile."}, status=404)
    except Main.DoesNotExist:
        return JsonResponse({"error": "Main details not found. Please complete your profile."}, status=404)

    image_instance = Image.objects.filter(user__id=user_id).first()

    def encode_image(image_field):
        if image_field and image_field.path:
            with open(image_field.path, 'rb') as img_file:
                return f"data:image/jpeg;base64,{base64.b64encode(img_file.read()).decode()}"
        return None

    profile_image_base64 = encode_image(image_instance.profile) if image_instance else None
    cover_image_base64 = encode_image(image_instance.cover_image) if image_instance else None

    html_content = render_to_string('portfolios/static_page.html', {
        'basic': basic,
        'main': main,
        'profile_image': profile_image_base64,
        'cover_image': cover_image_base64,
    })

    response = HttpResponse(html_content, content_type='application/octet-stream')
    response['Content-Disposition'] = f'attachment; filename="{basic.username}_portfolio.html"'
    return response
