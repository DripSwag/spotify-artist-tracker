from django.http import JsonResponse
from rest_framework.views import status
from datetime import datetime, timedelta

def instanciateModelSerializer(serializer, data):
    data["expiresIn"] = datetime.now() + timedelta(seconds=data["expiresIn"])
    serializedData = serializer(data=data)
    if serializedData.is_valid():
        serializedData.save()
        return JsonResponse(serializedData.data, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
