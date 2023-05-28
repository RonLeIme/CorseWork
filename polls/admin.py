from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Users, Movies, Schedule, Ticket


@admin.register(Users)
class CustomUserAdmin(admin.ModelAdmin):
    model = Users
    list_display = ('id', 'login', 'password', 'token')
    list_display_links = ('id', 'login', 'password', 'token')


@admin.register(Movies)
class CustomUserAdmin(admin.ModelAdmin):
    model = Movies
    list_display = ('id', 'title', 'year', 'imdb_rating')
    list_display_links = ('id', 'title', 'year', 'imdb_rating')


@admin.register(Schedule)
class CustomUserAdmin(admin.ModelAdmin):
    model = Schedule
    list_display = ('id', 'movie_id', 'date', 'price', 'hall', 'time')
    list_display_links = ('id', 'movie_id', 'date', 'price', 'hall', 'time')


@admin.register(Ticket)
class CustomUserAdmin(admin.ModelAdmin):
    model = Ticket
    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
