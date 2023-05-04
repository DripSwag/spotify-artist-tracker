function AritstSearchResult({ artistName, searchBarRef, setSearchResults, userId, artistId }){
	
	const clicked = async () => {
		const response = await fetch(`http://127.0.0.1:8000/api/artistIdsGet/${userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'user': userId,
				'artistId': artistId
			})
		})
		if(response.status == 201){
			searchBarRef.current.value = ''; setSearchResults([])
		}
	}

	return(
		<div onClick={clicked}>
			<p>{artistName}</p>
		</div>
	)
}
export default AritstSearchResult
