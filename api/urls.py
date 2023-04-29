from django.urls import path
from . import views

urlpatterns = [
    path("userAuthenticationURL/", views.spotifyAuthentication),
    path("spotifyAccessCodeUpdate/", views.spotifyAccessCodeUpdate),
    path("spotifyAccessCodeGet/<int:userId>", views.spotifyAccessCodeGet),
    path("artistIdsGet/<int:userId>", views.artistIds),
    path("artistIdDelete/<int:artistIdPk>", views.artistIdDelete),
    path("searchArtists/<int:userId>/<str:query>", views.searchArtists),
]
