import base64
from requests import Request, post

def getAuthURL():
    scope = "playlist-read-private user-read-playback-state user-modify-playback-state"

    url = Request('GET', 'https://accounts.spotify.com/authorize', params={
        'scope': scope,
        'response_type': 'code',
        'redirect_uri': 'http://localhost:5173/homepage',
        'client_id': 'babf997949194f5fb13a74e772889468',
    }).prepare().url

    return url

def getByteKey():
    client_secret = '4cc4226727c3494c9001cad6de52a8d1'
    client_id = 'babf997949194f5fb13a74e772889468'
    byteKey = base64.b64encode(client_id.encode() + b":" + client_secret.encode()).decode("utf-8")

    return 'Basic ' + byteKey

def getAccessToken(code):
    body = {
        'grant_type': "authorization_code",
        'code': code,
        'redirect_uri': 'http://localhost:5173/homepage',
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': getByteKey()
    }

    response = post('https://accounts.spotify.com/api/token', data=body, headers=headers).json()

    parsedData = {
        'accessToken': response.get('access_token'),
        'tokenType': response.get('token_type'),
        'expiresIn': response.get('expires_in'),
        'refreshToken': response.get('refresh_token'),
    }

    return parsedData

