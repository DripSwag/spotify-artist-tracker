from datetime import datetime, timedelta
from django.db import models
import base64
from django.utils.functional import new_method_proxy
from requests import post

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

    def updateAccessToken(self):
        client_secret = '4cc4226727c3494c9001cad6de52a8d1'
        client_id = 'babf997949194f5fb13a74e772889468'
        byteKey = base64.b64encode(client_id.encode() + b":" + client_secret.encode()).decode("utf-8")

        body = {
            'grant_type': "refresh_token",
            'refresh_token': self.refreshToken,
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + byteKey
        }

        response = post('https://accounts.spotify.com/api/token', data=body, headers=headers).json()
        newExpirey = datetime.now() + timedelta(seconds=response.get('expires_in'))

        self.accessToken = response.get('access_token')
        self.tokenType = response.get('token_type')
        self.expiresIn = newExpirey
        self.save()
