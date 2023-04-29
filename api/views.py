from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import status
from datetime import datetime, timedelta
from api.models import SpotifyAccessCode, ArtistId
from .spotify_utils import getAuthURL, getAccessToken
from .views_utils import createSerializedResponse, instanciateModelSerializer
from .serializer import SpotifyAccessCodeSerializer, ArtistIdSerializer

# Create your views here.

@api_view(["GET"])
def spotifyAuthentication(request):
    if request.method == 'GET':
        return Response({'url': getAuthURL()}, status=status.HTTP_200_OK)

@api_view(['POST'])
def spotifyAccessCodeUpdate(request):
    if request.method == 'POST':
        requestBody = request.data
        try:
            preExistingCode = SpotifyAccessCode.objects.get(user=requestBody['userId'])
            preExistingCode.updateAccessTokenWithAccess(requestBody['code'])
            return createSerializedResponse(SpotifyAccessCodeSerializer, preExistingCode)
        except SpotifyAccessCode.DoesNotExist:
            parsedData = getAccessToken(requestBody["code"])
            parsedData["user"] = requestBody["userId"]
            parsedData["expiresIn"] = datetime.now() + timedelta(seconds=parsedData["expiresIn"])
            return instanciateModelSerializer(SpotifyAccessCodeSerializer, parsedData)

@api_view(['GET'])
def spotifyAccessCodeGet(request, userId):
    if request.method == 'GET':
        preExistingCode = SpotifyAccessCode.objects.get(user=userId)
        return createSerializedResponse(SpotifyAccessCodeSerializer, preExistingCode)

@api_view(['GET', 'POST'])
def artistIds(request, userId):
    if request.method == 'GET':
        artistIds = ArtistId.objects.filter(user=userId)
        return createSerializedResponse(ArtistIdSerializer, artistIds, many=True)
    #This works on the assumption that if youre using this you probably already have an account, I should probably seperate this
    elif request.method == 'POST':
        return instanciateModelSerializer(ArtistIdSerializer, request.data)

@api_view(['DELETE'])
def artistIdDelete(request, artistIdPk):
    if request.method == 'DELETE':
        artistId = ArtistId.objects.get(id=artistIdPk)
        artistId.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

