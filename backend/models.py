from django.db import models
from colorfield.fields import ColorField
from datetime import datetime
from django.contrib.auth.models import AbstractUser


# ==================== Course and Tag ====================
class BasicTag(models.Model):
    name = models.CharField(max_length=100)
    colour = ColorField(default='#FF0000')
    is_public = models.BooleanField(default=True)  # whether tag is public or not

    def __str__(self):
        return self.name
    

class Tag(BasicTag):
    owner = models.ForeignKey('CustomUser', on_delete=models.CASCADE)



class Course(BasicTag):
    grade_choices = [
        ('9', 'Grade 9'),
        ('10', 'Grade 10'),
        ('11', 'Grade 11'),
        ('12', 'Grade 12'),
    ]
    code = models.CharField(max_length=10)
    grade = models.CharField(max_length=2, choices=grade_choices)
    isCurrent = models.BooleanField(default=True)  # whether course is current or not


# ==================== Marks and Achievements ====================
class Entry(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField(default=datetime.now)  # creation date
    description = models.TextField(blank=True)  # description of entry
    tags = models.ManyToManyField(Tag, blank=True)  # tags associated with entry
    is_public = models.BooleanField(default=False)  # whether entry is public or not

    def __str__(self):
        return self.name + " " + str(self.date)


class MarkEntry(Entry):  # extends Entry
    numerator = models.IntegerField()
    denominator = models.IntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)  # course code
    
    def __str__(self):
        return self.name
    
    def get_percent(self):
        return round(self.numerator / self.denominator * 100, 2)


class AchievementEntry(Entry):
    pass


# ==================== User ====================
class CustomUser(AbstractUser):
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True, null=True, verbose_name='Profile picture') # default pfp is done in frontend
    bio = models.TextField(blank=True)
    graduating_year = models.IntegerField(blank=True, null=True)
    courses = models.ManyToManyField(Course, blank=True, related_name='courses')
    tags = models.ManyToManyField(Tag, blank=True, related_name='tags')
    marks = models.ManyToManyField(MarkEntry, blank=True)
    achievements = models.ManyToManyField(AchievementEntry, blank=True)

    def __str__(self):
        return self.username
