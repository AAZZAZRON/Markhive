from rest_framework import serializers
from .models import *

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'colour']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'code', 'grade', 'isCurrent', 'colour']


class MarkEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MarkEntry
        fields = ['id', 'name', 'date', 'description', 'tags', 'numerator', 'denominator', 'course']

    def to_representation(self, instance): # add percentage to representation
        data = super().to_representation(instance)
        data['percent'] = instance.get_percent()
        return data



class AchievementEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = AchievementEntry
        fields = ['id', 'name', 'date', 'description', 'tags']


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_pic', 'bio', 'graduating_year']



class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_pic', 'bio', 'graduating_year', 'courses', 'tags', 'marks', 'achievements']
    
    
    def get_courses(self, instance):
        return CourseSerializer(instance.courses.all(), many=True).data


    def get_tags(self, instance, isSelf):
        print(instance.tags.all())
        if isSelf:
            return TagSerializer(instance.tags.all(), many=True).data
        else:
            return TagSerializer(instance.tags.filter(is_public=True), many=True).data


    def get_marks(self, instance, isSelf):
        if isSelf:
            return MarkEntrySerializer(instance.marks.all(), many=True).data
        else:
            return MarkEntrySerializer(instance.marks.filter(is_public=True), many=True).data


    def get_achievements(self, instance, isSelf):
        if isSelf:
            return AchievementEntrySerializer(instance.achievements.all(), many=True).data
        else:
            return AchievementEntrySerializer(instance.achievements.filter(is_public=True), many=True).data


    def to_representation(self, instance):
        request = self.context.get('request')
        user = request.user
        return {
            'id': instance.id,
            'username': instance.username,
            'first_name': instance.first_name,
            'last_name': instance.last_name,
            'profile_pic': instance.profile_pic.url if instance.profile_pic else None,
            'bio': instance.bio,
            'graduating_year': instance.graduating_year,
            # 'courses': self.get_courses(instance),
            # 'tags': self.get_tags(instance, user == instance),
            # 'marks': self.get_marks(instance, user == instance),
            # 'achievements': self.get_achievements(instance, user == instance),
        }
