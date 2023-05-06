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
		<div className="h-full overflow-auto flex flex-col gap-4 bg-neutral-900 m-2 rounded-lg p-4">
			{
				artists && artists.map((data) => {
					return <ArtistLabel key={data['id']} artistId={data['artistId']} pk={data['id']} name={data['name']} pictureLink={data['pictureLink']} />
			})
			}
		</div>
	)
}
export default ArtistShowcase
