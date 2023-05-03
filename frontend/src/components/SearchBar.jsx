import { useRef, useEffect, useState } from "react"

function SearchBar({ userId }){
	const searchBarRef = useRef(null)
	const [searchResults, setSearchResults] = useState([])
	const [searchHasFocus, setSearchHasFocus] = useState(false)

	const searchArtist = async (searchQuery) => {
		if(searchQuery){
			const artistSearchBody = await fetch(`http://127.0.0.1:8000/api/searchArtists/${userId}/${parseSearchQuery(searchQuery)}`).then((data) => data.json())
			console.log(artistSearchBody)
			setSearchResults(artistSearchBody)
		}
	}

	const parseSearchQuery = (searchQuery) => {
		return searchQuery.replace(' ', '%20')
	}

	useEffect(() => {
		const checkIfClickedOutside = (event) => {
			if(searchBarRef.current && searchBarRef.current.contains(event.target)){
				setSearchHasFocus(true)
			}
			else{
				setSearchHasFocus(false)
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	})

	return(
		<div>
			<input type='search' ref={searchBarRef} placeholder='Search Artist' onChange={(input) => {searchArtist(input.target.value)}}></input>
			{
				searchHasFocus === true && searchResults && searchResults.map((data, keyIndex) => {
					//Change the p into a artist component
					return <p key={keyIndex}>{data["name"]}</p>
			})
			}
		</div>
	)
}
export default SearchBar
