from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api/', include('users.urls')),
     path('api/', include('basicdetails.urls')),
     path('api/', include('maindetails.urls')),
     path('api/', include('portfolio.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
