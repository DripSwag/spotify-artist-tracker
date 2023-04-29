from datetime import datetime, timedelta, timezone
from django.db import models
from rest_framework.response import Response
from requests import post, get
from rest_framework.views import status
from .spotify_utils import getAccessToken, getByteKey

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=257)

class ArtistId(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artistId = models.CharField(max_length=200)

class SpotifyAccessCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default = 1)
    createdAt = models.DateTimeField(auto_now_add=True)
    accessToken = models.CharField(max_length=200)
    refreshToken = models.CharField(max_length=200)
    expiresIn = models.DateTimeField()
    tokenType = models.CharField(max_length=50)

    def updateAccessTokenWithRefresh(self):
        body = {
            'grant_type': "refresh_token",
            'refresh_token': self.refreshToken,
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': getByteKey()
        }

        response = post('https://accounts.spotify.com/api/token', data=body, headers=headers).json()
        newExpirey = datetime.now() + timedelta(seconds=response.get('expires_in'))

        self.accessToken = response.get('access_token')
        self.tokenType = response.get('token_type')
        self.expiresIn = newExpirey
        self.save()

    def updateAccessTokenWithAccess(self, code:str):
        parsedData = getAccessToken(code)

        self.accessToken = parsedData['accessToken']
        self.tokenType = parsedData['tokenType']
        self.expiresIn = datetime.now() + timedelta(seconds=parsedData['expiresIn'])
        self.refreshToken = parsedData['refreshToken']
        self.save()

    def getAccessToken(self):
        #Datetime now is like that because datetime doesnt include timezone with it. When we make the access token the date model field puts a timezone. Comparison checks require a timezone
        if self.expiresIn < datetime.now().replace(tzinfo=timezone(offset=timedelta())):
            self.updateAccessTokenWithRefresh()
        return self.accessToken

    def searchArtists(self, query):
        params = {
            'q': query,
            'type': 'artist',
            'limit': 3
        }

        headers = {
            'Authorization': f"Bearer {self.getAccessToken()}"
        }

        response = get('https://api.spotify.com/v1/search', params=params, headers=headers).json()

        return Response(response, status=status.HTTP_200_OK)

