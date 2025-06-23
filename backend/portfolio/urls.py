from django.urls import path
from .views import download_static_page, ImageAPIView

urlpatterns = [
    path('download/<int:user_id>/', download_static_page, name='download_portfolio'),
    path('images/', ImageAPIView.as_view(), name='images-post'),  # POST
    path('images/<int:user_id>/', ImageAPIView.as_view(), name='images-user'),  # GET, PUT by user
]