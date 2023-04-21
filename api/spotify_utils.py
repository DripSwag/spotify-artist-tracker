from requests import Request

def getAuthURL():
    scope = "playlist-read-private"

    url = Request('GET', 'https://accounts.spotify.com/authorize', params={
        'scope': scope,
        'response_type': 'code',
        'redirect_uri': 'http://localhost:5173/homepage',
        'client_id': 'babf997949194f5fb13a74e772889468',
    }).prepare().url

    return url

def getAccessToken(code):
    grant_type = "authorization_code"
    redirect_uri = 'http://localhost:5173/homepage'

    response = Request('POST', 'https//accounts.spotify.com/api/token', json={
        'grant_type': grant_type,
        'code': code,
        'redirect_uri': redirect_uri,
    }).json()

    accessToken = response.get('access_token')
    tokenType = response.get('token_type')
    scope = response.get('token')
    expiresIn = response.get('expires_in')
    refreshToken = response.get('refresh_token')
