function ArtistLabel({ artistId, pk, name, pictureLink }){
	return(
		<div className="flex items-center h-12 gap-6 rounded-lg">
			<img src={pictureLink} className="h-full aspect-square" ></img>
			<p className="text-md font-medium text-white">{name}</p>
		</div>
	)
}
export default ArtistLabel
