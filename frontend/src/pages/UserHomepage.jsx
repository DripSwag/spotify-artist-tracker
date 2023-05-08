import { useLocation } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import SearchBar from "../components/SearchBar"
import ArtistShowcase from "../components/ArtistShowcase"
import { motion } from "framer-motion"

function UserHomepage(){
	const location = useLocation()
	const [accessCode, setAccessCode] = useState()
	const [artists, setArtists] = useState()
	const [searching, setSearching] = useState()

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

	//Move this to utils to make it cleaner. This is messy passing through every child.
	const getArtistsIds = useCallback(async () => {
		const response = await fetch(`http://127.0.0.1:8000/api/artistIdsGet/1`)
		if(response.status === 204){
			setArtists([])
		}
		else{
			setArtists(await response.json())
		}
	}, [setArtists])

	useEffect(() => {
		getAccessCode()
		getArtistsIds()
	}, [])

	return(
		<section className="flex static cursor-default">
			<div className="w-1/2 h-screen bg-[#77DD77]">
			</div>
			<div className="w-1/2 bg-zinc-950 h-screen flex flex-col py-6 px-10 gap-8 items-center">
				<SearchBar
					userId={location.state.id}
					getArtistsIds={getArtistsIds}
					setSearching={setSearching}
					searching={searching}
				/>
				<ArtistShowcase
					artists={artists}
					getArtistsIds={getArtistsIds}
					searching={searching}
				/>
			</div>
		</section>
	)
}
export default UserHomepage
