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
    def retrieve(self, request, pk=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=pk)
        serializer = UserDetailSerializer(user, context={'request': request})
        return Response(serializer.data)
