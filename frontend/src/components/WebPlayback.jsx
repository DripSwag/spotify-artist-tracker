import {useEffect} from "react"

function WebPlayback({ accessToken }){

	useEffect(() => {

		const script = document.createElement('script')
		script.src = 'https://sdk.scdn.co/spotify-player.js'
		script.async = true

		document.body.appendChild(script)

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: cb => { cb(accessToken) },
				volume: 0.5,
			})

			player.addListener('ready', ({ deviceId }) => {
				console.log('ready')
			})

			player.addListener('not_ready', ({ deviceId }) => {
				console.log('not ready')
			})

			document.getElementById('playButton').onclick = () => {
				player.togglePlay()
			}

			player.connect()

		}

	}, [accessToken])

	return(
		<section>
			<h1>Test</h1>
			<button id="playButton">Play</button>
		</section>
	)
}
export default WebPlayback
