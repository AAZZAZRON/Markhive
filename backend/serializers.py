from rest_framework import serializers
from .models import *

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'owner', 'colour']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'owner', 'colour', 'code', 'grade']


class MarkEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkEntry
        fields = ['id', 'name', 'date', 'description', 'tags', 'is_public', 'numerator', 'denominator', 'course']


class AchievementEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementEntry
        fields = ['id', 'name', 'date', 'description', 'tags', 'is_public']


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        # fields = ['id', 'username', 'email', 'first_name', 'last_name', 'courses', 'tags', 'mark_entries', 'achievement_entries']

