from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from .serializers import *
from .models import *
from django.http import Http404


# Create your views here.


"""
User ViewSets
"""
class UserViewSet(viewsets.ViewSet):
    # get all users
    def list(self, request):
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
    def getCourses(self, request, username=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=username)
        serializer = CourseSerializer(user.courses.all(), many=True)
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
