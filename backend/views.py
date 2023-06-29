from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status
from .serializers import *
from .models import *


# Create your views here.

# TODO: make loginrequired default
class CustomUserViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
