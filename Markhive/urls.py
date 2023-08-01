from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls), # admin page
    path('api/', include('backend.api.urls')), # api urls
    path('auth/', include('backend.auth.urls')), # auth urls
    path('post/', include('backend.post.urls')), # post urls
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
