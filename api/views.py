from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import status
from .spotify_utils import getAuthURL

# Create your views here.

@api_view(["GET"])
def spotifyAuthentication(request):
    if request.method == 'GET':
        return Response({'url': getAuthURL()}, status=status.HTTP_200_OK)

@api_view(['POST'])
def getSpotifyAccessCode(request):
    pass
