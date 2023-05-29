function AritstSearchResult({
	artistName,
	searchBarRef,
	setSearchResults,
	userId,
	artistId,
	pictureLink,
	getArtistsIds,
	setSearching,
}) {
	const clicked = async () => {
		const response = await fetch(
			`http://127.0.0.1:8000/api/artistIdsGet/${userId}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: userId,
					artistId: artistId,
					name: artistName,
					pictureLink: pictureLink,
				}),
			}
		);
		if (response.status == 201) {
			searchBarRef.current.value = "";
			setSearchResults([]);
			setSearching(false);
			getArtistsIds();
		}
	};

	return (
		<div
			onClick={clicked}
			className="flex h-24 items-center gap-4 bg-neutral-800 p-4 rounded-lg"
		>
			<img
				src={pictureLink}
				alt="No Image"
				className="aspect-square h-full rounded-full"
			></img>
			<p className="font-bold">{artistName}</p>
		</div>
	);
}
export default AritstSearchResult;
