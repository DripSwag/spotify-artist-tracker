function HomePage(){
	const getSpotifyCode = () => {
		const url = window.location.href
		const splittedUrl = url.split("=")
		return splittedUrl[1]
	}

	return(
		<h1>Homepage</h1>
	)
}
export default HomePage
