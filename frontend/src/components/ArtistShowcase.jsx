import { useState, useEffect } from "react"
import ArtistLabel from "./ArtistLabel"

function ArtistShowcase(){
	const [artists, setArtists] = useState()

	const getUserArtistIds = async () => {
		const response = await fetch('http://127.0.0.1:8000/api/artistIdsGet/1').then((data) => {return data.json()})
		setArtists(response)
	}

	useEffect(() => {
		getUserArtistIds()
	}, [getUserArtistIds])

	return(
		<div>
			<h1>Artists</h1>
			{
				artists && artists.map((data) => {
					return <ArtistLabel key={data['id']} artistId={data['artistId']} pk={data['id']} name={data['name']} />
			})
			}
		</div>
	)
}
export default ArtistShowcase
