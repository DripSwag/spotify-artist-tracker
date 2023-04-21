function Login(){
	const getSpotifyAuthenticationURL = async () => {
		const response = await fetch('http://127.0.0.1:8000/api/userAuthenticationURL/')
		const result = await response.json()
		return result
	}

	const redirectWebsite = async () => {
		const url = await getSpotifyAuthenticationURL()
		window.location.href = url['url']
	}

	return(
		<div>
			<p>Test</p>
			<button onClick={redirectWebsite}>Spotify</button>
		</div>
	)
}
export default Login
