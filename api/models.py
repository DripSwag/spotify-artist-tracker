from datetime import datetime, timedelta
from django.db import models
import base64
from requests import post
from .spotify_utils import getByteKey

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=257)

class SpotifyAccessCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    createdAt = models.DateTimeField(auto_now_add=True)
    accessToken = models.CharField(max_length=200)
    refreshToken = models.CharField(max_length=200)
    expiresIn = models.DateTimeField()
    tokenType = models.CharField(max_length=50)

    def updateAccessTokenWithRefresh(self):
        clientVariables = getByteKey()

        body = {
            'grant_type': "refresh_token",
            'refresh_token': self.refreshToken,
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': clientVariables[2]
        }

        response = post('https://accounts.spotify.com/api/token', data=body, headers=headers).json()
        newExpirey = datetime.now() + timedelta(seconds=response.get('expires_in'))

        self.accessToken = response.get('access_token')
        self.tokenType = response.get('token_type')
        self.expiresIn = newExpirey
        self.save()

