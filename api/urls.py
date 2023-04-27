from django.urls import path
from . import views

urlpatterns = [
    path("userAuthenticationURL/", views.spotifyAuthentication),
    path("spotifyAccessCodeUpdate/", views.spotifyAccessCodeUpdate),
    path("spotifyAccessCodeGet/<int:userId>", views.spotifyAccessCodeGet),
]
