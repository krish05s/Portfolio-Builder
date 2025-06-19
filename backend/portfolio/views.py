import base64
from django.http import HttpResponse
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
from django.core.files.base import ContentFile
from django.templatetags.static import static
from .models import Image

def download_static_page(request, user_id):
    basic = get_object_or_404(Basic, id=user_id)
    main = get_object_or_404(Main, id=user_id)

    image_instance = Image.objects.first()  # You can also filter by user if you have a relation

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


class ImageAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, pk=None):
        if pk is not None:
            image = get_object_or_404(Image, pk=pk)
            serializer = ImageSerializer(image)
        else:
            images = Image.objects.all()
            serializer = ImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Always update the latest image (id=1), or create new if none exists
        image = Image.objects.first()
        if image:
            serializer = ImageSerializer(image, data=request.data, partial=True)
        else:
            serializer = ImageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK if image else status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
