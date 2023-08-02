from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from .serializers import *
from ..models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
# -------- API Views -------- #

"""
User ViewSets
"""
class UserViewSet(viewsets.ViewSet):
    # get all users
    permission_classes = [AllowAny]

    def list(self, request):
        print(request.user)
        if request.user.is_authenticated:
            print("authenticated")
        else:
            print("not authenticated")
        queryset = CustomUser.objects.all()
        serializer = UserListSerializer(queryset, many=True)
        return Response(serializer.data)


    # get user by username
    def retrieve(self, request, username=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=username)
        serializer = UserDetailSerializer(user, context={'request': request})
        return Response(serializer.data)


    # get user marks
    def getMarks(self, request, username=None):
        requesting_user = request.user or None
        print(requesting_user, request.user.is_authenticated)
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=username)
        if user != requesting_user:
            serializer = MarkEntrySerializer(user.marks.filter(is_public=True), many=True)
        else:
            serializer = MarkEntrySerializer(user.marks.all(), many=True)
        return Response(serializer.data)


    # get user achievements
    def getAchievements(self, request, username=None):
        requesting_user = request.user or None
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=username)
        if user != requesting_user:
            serializer = AchievementEntrySerializer(user.achievements.filter(is_public=True), many=True)
        else:
            serializer = AchievementEntrySerializer(user.achievements.all(), many=True)
        return Response(serializer.data)
    

    # get user courses
    def getAllCourses(self, request, username=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=username)
        serializer = CourseSerializer(user.all_courses.all(), many=True)
        return Response(serializer.data)
    

    # get user tags
    def getTags(self, request, username=None):
        requesting_user = request.user or None
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=username)
        if user != requesting_user:
            serializer = TagSerializer(user.tags.filter(is_public=True), many=True)
        else:
            serializer = TagSerializer(user.tags.all(), many=True)
        return Response(serializer.data)
    

