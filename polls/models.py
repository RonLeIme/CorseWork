from django.db import models


class Users(models.Model):
    login = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    token = models.CharField(max_length=50)


class Movies(models.Model):
    title = models.CharField(max_length=50)
    year = models.IntegerField()
    imdb_rating = models.FloatField()


class Schedule(models.Model):
    movie_id = models.ForeignKey(Movies, on_delete=models.CASCADE)
    date = models.CharField(max_length=50)
    price = models.FloatField()
    time = models.CharField(max_length=50)
    hall = models.IntegerField()
    seats = models.CharField(max_length=100)


class Ticket(models.Model):
    title = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=50)
    hall = models.IntegerField()
    price = models.FloatField()
    seat = models.IntegerField()
    user = models.CharField(max_length=50)
    schedule = models.CharField(max_length=50)
