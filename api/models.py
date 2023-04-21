from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=257)

class SpotifyAccessCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    createdAt = models.DateTimeField(auto_now_add=True)
    accessToken = models.CharField(max_length=150)
    refreshToken = models.CharField(max_length=150)
    expiresIn = models.DateTimeField()
    tokenType = models.CharField(max_length=50)
