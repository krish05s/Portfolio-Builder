from django.urls import path
from .views import download_static_page, ImageAPIView

urlpatterns = [
    path('download/<int:user_id>/', download_static_page, name='download_portfolio'),
    path('images/', ImageAPIView.as_view(), name='images'),          # POST and GET all
    path('images/<int:pk>/', ImageAPIView.as_view(), name='images'),
]