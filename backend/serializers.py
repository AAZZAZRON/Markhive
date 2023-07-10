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


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile_pic', 'bio', 'graduating_year']


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'first_name', 'last_name', 'profile_pic', 'bio', 'graduating_year', 'courses', 'tags', 'marks', 'achievements']
    # def to_representation(self, instance):
    #     request = self.context.get('request')
    #     user = request.user
    #     if user == instance: # if the user is requesting their own data
    #         return super().to_representation(instance)
    #     else: # if the user is requesting someone else's data     
    #         print(instance.courses.all())       
    #         return {
    #             'id': instance.id,
    #             'username': instance.username,
    #             'first_name': instance.first_name,
    #             'last_name': instance.last_name,
    #             'profile_pic': instance.profile_pic.url if instance.profile_pic else None,
    #             'bio': instance.bio,
    #             'graduating_year': instance.graduating_year,
    #             'courses': instance.courses.all().values('id', 'name', 'code', 'grade', 'colour'),
    #             'tags': instance.tags.filter(is_public=True).values('id', 'name', 'colour')
    #             # 'marks': instance.marks.filter(is_public=True),
    #             # 'achievements': instance.achievements.filter(is_public=True),
    #         }
