from django.urls import path
from .views import mainView

urlpatterns = [
    path('main/', mainView.as_view(), name='main'),
    path('main/<int:user_id>/', mainView.as_view(), name='main-detail'),
]
