from rest_framework.serializers import ModelSerializer
from .models import SpotifyAccessCode, ArtistId, User

class SpotifyAccessCodeSerializer(ModelSerializer):
    class Meta:
        model = SpotifyAccessCode
        fields = '__all__'

class ArtistIdSerializer(ModelSerializer):
    class Meta:
        model = ArtistId
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

