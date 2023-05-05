function AritstSearchResult({ artistName, searchBarRef, setSearchResults, userId, artistId, pictureLink }){

	const clicked = async () => {
		const response = await fetch(`http://127.0.0.1:8000/api/artistIdsGet/${userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'user': userId,
				'artistId': artistId,
				'name': artistName,
				'pictureLink': pictureLink
			})
		})
		if(response.status == 201){
			searchBarRef.current.value = ''; setSearchResults([])
		}
	}

	return(
		<div onClick={clicked}>
			<p>{artistName}</p>
			<img src={pictureLink}></img>
		</div>
	)
}
export default AritstSearchResult
