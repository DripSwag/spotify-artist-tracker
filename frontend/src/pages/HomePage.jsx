function HomePage(){

	const getSpotifyCode = () => {
		const url = window.location.href
		const splittedUrl = url.split("=")
		return splittedUrl[1]
	}

	const getAccessCode = async () => {
		const spotifyAccessCode = await fetch('http://127.0.0.1:8000/api/spotifyAccessCodeUpdate/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: 1,
				code: getSpotifyCode()
			})
		})

		return spotifyAccessCode
	}

	return(
		<div>
			<h1>Homepage</h1>
		</div>
	)
}
export default HomePage
