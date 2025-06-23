from django.urls import path
from .views import basicView

urlpatterns = [
    path('basic/<int:user_id>/', basicView.as_view(), name='basic-detail'),
    path('basic/', basicView.as_view(), name='basic'),
]
