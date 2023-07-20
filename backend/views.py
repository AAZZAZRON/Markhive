from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from .api.serializers import *
from .models import *
from django.http import Http404, HttpResponse

