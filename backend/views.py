from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from .serializers import *
from .models import *
from django.http import Http404, HttpResponse

# Auth0 imports
import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render
from django.urls import reverse
from urllib.parse import quote_plus, urlencode


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



# ------- Authentication Views ------- #

oauth = OAuth()

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)


def login(request):
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("callback"))
    )


def callback(request):
    token = oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return redirect(request.build_absolute_uri(reverse("index")))


def logout(request):
    request.session.clear()

    return redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": request.build_absolute_uri(reverse("index")),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        ),
    )


def index(request):
    return HttpResponse(json.dumps(request.session.get("user"), indent=4))

