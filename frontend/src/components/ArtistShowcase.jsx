import { AnimatePresence } from "framer-motion";
import ArtistLabel from "./ArtistLabel";

function ArtistShowcase({ artists, getArtistsIds, searching }) {
	return (
		<div
			className={`h-full w-full overflow-auto flex flex-col gap-4 bg-neutral-900 rounded-lg p-4 ${
				searching ? "hidden" : ""
			}`}
		>
			<h1 className="font-bold text-4xl my-2">Queue</h1>
			<AnimatePresence>
				{artists &&
					artists.map((data, index) => {
						return (
							<ArtistLabel
								key={data["id"]}
								queueNumber={index + 1}
								pk={data["id"]}
								name={data["name"]}
								pictureLink={data["pictureLink"]}
								getArtistsIds={getArtistsIds}
							/>
						);
					})}
			</AnimatePresence>
		</div>
	);
}
export default ArtistShowcase;
