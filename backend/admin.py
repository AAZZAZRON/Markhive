from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.
class TagAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ['name', 'code']


class CustomMarkEntryAdmin(admin.ModelAdmin):
    pass


class CustomAchievementEntryAdmin(admin.ModelAdmin):
    pass


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'graduating_year']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    list_filter = ['is_superuser', 'graduating_year']
    fieldsets = [
        ('Personal Information', {'fields': ['username', 'profile_pic', 'email', 'first_name', 'last_name', 'bio', 'graduating_year']}),
        ('Permissions', {'fields': ['is_superuser', 'is_staff', 'is_active']}),
        ('Courses', {'fields': ['courses']}),
        ('Tags', {'fields': ['tags']}),
        ('Marks', {'fields': ['marks']}),
        ('Achievements', {'fields': ['achievements']}),
    ]


admin.site.register(Tag, TagAdmin)
admin.site.register(Course, CourseAdmin)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(MarkEntry, CustomMarkEntryAdmin)
admin.site.register(AchievementEntry, CustomAchievementEntryAdmin)

