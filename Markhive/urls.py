"""
URL configuration for Markhive project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from backend import views as backend_views


user_list = backend_views.UserViewSet.as_view({
    'get': 'list',
})
user_detail = backend_views.UserViewSet.as_view({
    'get': 'retrieve',
})
user_marks = backend_views.UserViewSet.as_view({
    'get': 'getMarks',
})
user_achievements = backend_views.UserViewSet.as_view({
    'get': 'getAchievements',
})
user_courses = backend_views.UserViewSet.as_view({
    'get': 'getCourses',
})
user_tags = backend_views.UserViewSet.as_view({
    'get': 'getTags',
})


# api endpoints
user_urls = [
    path('', user_detail, name='user-detail'),
    path('marks/', user_marks, name='user-marks'),
    path('achievements/', user_achievements, name='user-achievements'),
    path('courses/', user_courses, name='user-courses'),
    path('tags/', user_tags, name='user-tags'),
]

api_urls = [
    path('users/', user_list, name='user-list'),
    path('user/<str:username>/', include(user_urls)),
]

urlpatterns = [
    path('admin/', admin.site.urls), # admin page
    path('api-auth/', include('rest_framework.urls')), # login and logout
    path('api/', include(api_urls)), # user api
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
