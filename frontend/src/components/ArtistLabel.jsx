function ArtistLabel({ pk, name, pictureLink, queueNumber }){

	const removeFromQueue = async () => {
		const response = await fetch(`http://127.0.0.1:8000/api/artistIdDelete/${pk}`,{
			method: 'DELETE'
		})
	}

	return(
		<div className="flex items-center h-12 gap-6 rounded-lg relative">
			<p>{queueNumber}</p>
			<img src={pictureLink} className="h-full aspect-square" ></img>
			<p className="text-md font-medium">{name}</p>
			<button onClick={removeFromQueue} className="text-2xl font-extrabold text-neutral-600 cursor-default absolute right-2 hover:text-white">x</button>
		</div>
	)
}
export default ArtistLabel
