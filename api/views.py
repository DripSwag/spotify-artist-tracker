from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import status
from datetime import datetime, timedelta
from api.models import SpotifyAccessCode
from .spotify_utils import getAuthURL, getAccessToken
from .views_utils import instanciateModelSerializer
from .serializer import SpotifyAccessCodeSerializer

# Create your views here.

@api_view(["GET"])
def spotifyAuthentication(request):
    if request.method == 'GET':
        return Response({'url': getAuthURL()}, status=status.HTTP_200_OK)

@api_view(['POST'])
def spotifyAccessCode(request):
    requestBody = request.data
    try:
        preExistingCode = SpotifyAccessCode.objects.get(user=requestBody['userId'])
        preExistingCode.updateAccessToken()
        return(instanciateModelSerializer(SpotifyAccessCodeSerializer, preExistingCode))

    except SpotifyAccessCode.DoesNotExist:
        parsedData = getAccessToken(requestBody["code"])
        parsedData["user"] = requestBody["userId"]
        parsedData["expiresIn"] = datetime.now() + timedelta(seconds=parsedData["expiresIn"])
        return instanciateModelSerializer(SpotifyAccessCodeSerializer, parsedData)
