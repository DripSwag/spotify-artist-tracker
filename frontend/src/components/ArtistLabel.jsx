function ArtistLabel({ artistId, pk, name, pictureLink, queueNumber }){
	return(
		<div className="flex items-center h-12 gap-6 rounded-lg">
			<p>{queueNumber}</p>
			<img src={pictureLink} className="h-full aspect-square" ></img>
			<p className="text-md font-medium">{name}</p>
		</div>
	)
}
export default ArtistLabel
