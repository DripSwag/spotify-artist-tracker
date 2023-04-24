from rest_framework.serializers import ModelSerializer
from .models import SpotifyAccessCode

class SpotifyAccessCodeSerializer(ModelSerializer):
    class Meta:
        model = SpotifyAccessCode
        fields = '__all__'
