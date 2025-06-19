from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Main
from .serializers import MainSerializer


class mainView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, pk=None):
        if pk:
            basic = get_object_or_404(Main, pk=pk)
            serializer = MainSerializer(basic)
            return Response(serializer.data)
        else:
            basics = Main.objects.all()
            serializer = MainSerializer(basics, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = MainSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        basic = get_object_or_404(Main, pk=pk)
        serializer = MainSerializer(basic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

