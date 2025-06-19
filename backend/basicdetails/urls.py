from django.urls import path
from .views import basicView

urlpatterns = [
    path('basic/', basicView.as_view(), name='basic'),
    path('basic/<int:pk>/', basicView.as_view(), name='basic-detail'),
]
