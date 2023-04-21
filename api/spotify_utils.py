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
