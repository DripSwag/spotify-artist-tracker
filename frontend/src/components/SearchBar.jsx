import { useRef, useState } from "react"
import AritstSearchResult from "./ArtistSearchResult"

function SearchBar({ userId, getArtistsIds, setSearching }){
	const searchBarRef = useRef(null)
	const [searchResults, setSearchResults] = useState([])

	const searchArtist = async (searchQuery) => {
		if(searchQuery){
			const artistSearchBody = await fetch(`http://127.0.0.1:8000/api/searchArtists/${userId}/${parseSearchQuery(searchQuery)}`).then((data) => data.json())
			setSearchResults(artistSearchBody)
			setSearching(true)
		}
		else{
			setSearchResults([])
			setSearching(false)
		}
	}

	const parseSearchQuery = (searchQuery) => {
		return searchQuery.replace(' ', '%20')
	}

	return(
		<div>
			<input type='search' ref={searchBarRef} placeholder='Search Artist' onChange={(input) => {searchArtist(input.target.value)}}></input>
			{
				searchResults && searchResults.map((data, keyIndex) => {
					return <AritstSearchResult key={keyIndex} artistName={data["name"]} searchBarRef={searchBarRef} setSearchResults={setSearchResults} artistId={data["id"]} userId={userId} pictureLink={data["images"][1]['url']} getArtistsIds={getArtistsIds} />
			})
			}
		</div>
	)
}
export default SearchBar
