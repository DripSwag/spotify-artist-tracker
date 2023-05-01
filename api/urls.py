from django.urls import path
from . import views

urlpatterns = [
    path("userAuthenticationURL/", views.spotifyAuthentication),
    path("userLogin/<str:username>/<str:password>", views.getUserDetails),
    path("spotifyAccessCodeUpdate/", views.spotifyAccessCodeUpdate),
    path("artistIdsGet/<int:userId>", views.artistIds),
    path("artistIdDelete/<int:artistIdPk>", views.artistIdDelete),
    path("searchArtists/<int:userId>/<str:query>", views.searchArtists),
]
