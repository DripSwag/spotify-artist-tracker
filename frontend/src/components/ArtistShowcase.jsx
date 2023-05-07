import ArtistLabel from "./ArtistLabel"

function ArtistShowcase({ artists, getArtistsIds }){
	return(
		<div className="h-full overflow-auto flex flex-col gap-4 bg-neutral-900 m-2 rounded-lg p-4">
			{
				artists && artists.map((data, index) => {
					return <ArtistLabel key={data['id']} queueNumber={index + 1} pk={data['id']} name={data['name']} pictureLink={data['pictureLink']} getArtistsIds={getArtistsIds}/>
			})
			}
		</div>
	)
}
export default ArtistShowcase
