import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import ArtistShowcase from "../components/ArtistShowcase"

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

	const getAritstIds = async () => {
		const artistIds = await fetch(`http://127.0.0.1:8000/api/artistIdsGet/${location.state.id}`).then((data) => data.json())
		setArtists(artistIds)
	}

	useEffect(() => {
		getAccessCode()
		getAritstIds()
	}, [])

	return(
		<section className="flex static">
			<div className="w-1/2 h-screen bg-[#77DD77]"></div>
			<div className="w-1/2 bg-zinc-950 h-screen flex flex-col">
				<SearchBar userId={location.state.id} />
				<ArtistShowcase />
			</div>
		</section>
	)
}
export default UserHomepage
