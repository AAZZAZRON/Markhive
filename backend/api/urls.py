from django.urls import path, include
from . import views as api_views

# -------- API Views -------- #
user_list = api_views.UserViewSet.as_view({
    'get': 'list',
})
user_detail = api_views.UserViewSet.as_view({
    'get': 'retrieve',
})
user_marks = api_views.UserViewSet.as_view({
    'get': 'getMarks',
})
user_achievements = api_views.UserViewSet.as_view({
    'get': 'getAchievements',
})
user_courses = api_views.UserViewSet.as_view({
    'get': 'getCourses',
})
user_tags = api_views.UserViewSet.as_view({
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


# api urls
urlpatterns = [
    path('users/', user_list, name='user-list'),
    path('user/<str:username>/', include(user_urls)),
]

