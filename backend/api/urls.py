from django.urls import path, include
from . import views as backend_views


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

urlpatterns = [
    path('users/', user_list, name='user-list'),
    path('user/<str:username>/', include(user_urls)),
]