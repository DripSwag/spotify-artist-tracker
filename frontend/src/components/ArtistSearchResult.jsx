function AritstSearchResult({ artistName, searchBarRef, setSearchResults }){
	return(
		<div onClick={() => {searchBarRef.current.value = ''; setSearchResults([])}}>
			<p>{artistName}</p>
		</div>
	)
}
export default AritstSearchResult
