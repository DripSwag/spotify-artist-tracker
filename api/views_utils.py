from rest_framework.views import status
from rest_framework.response import Response

#Make the save part seperate, breaks solid principles
def instanciateModelSerializer(serializer, data):
    serializedData = serializer(data=data)
    if serializedData.is_valid():
        serializedData.save()
        return Response(serializedData.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

def createSerializedResponse(serializer, model):
    serializedData = serializer(model)
    return Response(serializedData.data, status=status.HTTP_201_CREATED)

