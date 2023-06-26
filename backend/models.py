from django.db import models
from colorfield.fields import ColorField
from datetime import datetime
from django.contrib.auth.models import AbstractUser


# ==================== Course and Tag ====================
class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    colour = ColorField(default='#FF0000')

    def __str__(self):
        return self.name
    

class Tag(models.Model):
    name = models.CharField(max_length=100)
    colour = ColorField(default='#FF0000')

    def __str__(self):
        return self.name


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
        return self.name + " " + str(self.date) + " " + str(self.get_percent)
    
    def get_percent(self):
        return round(self.numerator / self.denominator * 100, 2)


class AchievementEntry(Entry):
    pass


# ==================== User ====================
class CustomUser(AbstractUser):
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True) 
    bio = models.TextField(blank=True)
    graduating_year = models.IntegerField(blank=True, null=True)


    def __str__(self):
        return self.username