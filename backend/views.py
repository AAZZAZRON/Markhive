from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import *
from .models import *


# Create your views here.


"""
User ViewSets
"""
class UserViewSet(viewsets.ModelViewSet):
    # get all users
    serializer_class = UserListSerializer
    queryset = CustomUser.objects.all()

    # get specific user
    def retrieve(self, request, pk=None):
        queryset = CustomUser.objects.all()
        user = get_object_or_404(queryset, username=pk)
        serializer = UserDetailSerializer(user, context={'request': request})
        return Response(serializer.data)
