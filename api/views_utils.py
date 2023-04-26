from django.http import JsonResponse
from rest_framework.views import status

def instanciateModelSerializer(serializer, data):
    serializedData = serializer(data=data)
    if serializedData.is_valid():
        serializedData.save()
        return JsonResponse(serializedData.data, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
