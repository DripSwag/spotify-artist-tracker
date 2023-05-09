import { useRef, useState, useEffect } from "react"
import AritstSearchResult from "./ArtistSearchResult"
import { motion } from 'framer-motion'

function SearchBar({ userId, getArtistsIds, setSearching, searching }){
	const searchBarRef = useRef(null)
	const [searchBody, setSearchBody] = useState()
	const [searchResults, setSearchResults] = useState([])

	const parseSearchQuery = (searchQuery) => {
		return searchQuery.replace(' ', '%20')
	}

	useEffect(() => {
		const timeOut = setTimeout(async () => {
			if(searchBody){
				const artistSearchBody = await fetch(`http://127.0.0.1:8000/api/searchArtists/${userId}/${parseSearchQuery(searchBody)}`).then((data) => data.json())
				setSearchResults(artistSearchBody)
			}
			else{
				setSearchResults([])
			}

			return () => clearTimeout(timeOut)
		}, 400)
	}, [searchBody])

	return(
		<div className={`w-full relative flex flex-col ${searching ? 'h-full' : ''}`}>
			<input type='search' ref={searchBarRef} placeholder='Search Artist' onChange={(input) => {setSearchBody(input.target.value); input.target.value ? setSearching(true) : setSearching(false)}} className='p-2 rounded-lg font-bold relative left-1/2 -translate-x-1/2'></input>
			<div className={`overflow-y-auto flex flex-col gap-8 h-full py-8 ${searching ? '' : 'hidden'}`}>
				<h1 className="font-bold text-4xl">Artists</h1>
				{
					searchResults && searchResults.map((data, keyIndex) => {
						return <AritstSearchResult
											key={keyIndex}
											artistName={data["name"]}
											searchBarRef={searchBarRef}
											setSearchResults={setSearchResults}
											artistId={data["id"]}
											userId={userId}
											pictureLink={data["images"].length !== 0 ? data['images'][0]['url'] : ''}
											getArtistsIds={getArtistsIds}
											setSearching={setSearching}
										/>
				})
				}
				<h1 className={`${searchResults.length === 0 && searching ? '' : 'hidden'} text-3xl font-bold`}>No results</h1>
			</div>
		</div>
	)
}
export default SearchBar
