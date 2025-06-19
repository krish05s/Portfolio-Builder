from django.urls import path
from .views import mainView

urlpatterns = [
    path('main/', mainView.as_view(), name='main'),
    path('main/<int:pk>/', mainView.as_view(), name='main-detail'),
]