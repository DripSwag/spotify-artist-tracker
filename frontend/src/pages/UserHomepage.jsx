import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

function UserHomepage(){
	const location = useLocation()
	const [accessCode, setAccessCode] = useState()
	const [artists, setArtists] = useState()

	const getAccessCode = async () => {
		const spotifyAccessCode = await fetch('http://127.0.0.1:8000/api/spotifyAccessCodeUpdate/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: location.state.id,
				code: location.state.authorization_code
			})
		})

		spotifyAccessCode.status === 201 ? setAccessCode(true) : setAccessCode(false)
	}

	//Make this a useCallback. When i make a search input field, this function should be called
	const getAritstIds = async () => {
		const artistIds = await fetch(`http://127.0.0.1:8000/api/artistIdsGet/${location.state.id}`).then((data) => data.json())
		setArtists(artistIds)
	}

	useEffect(() => {
		getAccessCode()
	}, [getAritstIds])

	return(
		<section>
			<button onClick={() => {console.log(accessCode)}}>accessCode</button>
			<button onClick={() => {console.log(artists)}}>aritsts</button>
		</section>
	)
}
export default UserHomepage
