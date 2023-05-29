import { AnimatePresence, motion } from "framer-motion";

function ArtistLabel({ pk, name, pictureLink, queueNumber, getArtistsIds }) {
	const removeFromQueue = async () => {
		const response = await fetch(
			`http://127.0.0.1:8000/api/artistIdDelete/${pk}`,
			{
				method: "DELETE",
			}
		);
		getArtistsIds();
	};

	return (
		<motion.div
			className="flex items-center h-12 gap-6 rounded-lg relative"
			i
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<p>{queueNumber}</p>
			<img src={pictureLink} className="h-full aspect-square"></img>
			<p className="text-md font-medium">{name}</p>
			<motion.button
				onClick={removeFromQueue}
				className="text-2xl font-extrabold text-neutral-600 cursor-default absolute right-2"
				whileHover={{ color: [null, "rgb(82,82,82)", "rgb(255,255,255)"] }}
				transition={{ duration: 0.2 }}
			>
				x
			</motion.button>
		</motion.div>
	);
}
export default ArtistLabel;
