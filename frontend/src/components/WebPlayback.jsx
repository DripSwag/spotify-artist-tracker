import { useEffect, useState } from "react";

export default function WebPlayback({ accessToken }) {
	const [player, setPlayer] = useState();
	const [playing, setPlaying] = useState(false);

	//move this out later
	async function test() {
		const response = await fetch(
			"https://api.spotify.com/v1/me/player/devices",
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		)
			.then((data) => data.json())
			.then((body) => {
				console.log(body);
			});
	}

	function play() {
		player.togglePlay();
		player.getCurrentState().then((state) => {
			console.log(state);
			try {
				state["paused"] ? setPlaying(true) : setPlaying(false);
			} catch {
				setPlaying(false);
			}
		});
	}

	useEffect(() => {
		if (accessToken !== undefined) {
			const script = document.createElement("script");
			script.src = "https://sdk.scdn.co/spotify-player.js";
			script.async = true;

			document.body.appendChild(script);

			window.onSpotifyWebPlaybackSDKReady = () => {
				const player = new window.Spotify.Player({
					name: "Web Playback SDK",
					getOAuthToken: (cb) => {
						cb(accessToken);
					},
					volume: 0.5,
				});

				setPlayer(player);

				player.addListener("ready", async ({ device_id }) => {
					console.log("ready", device_id);

					const response = await fetch("https://api.spotify.com/v1/me/player", {
						method: "PUT",
						headers: {
							Authorization: "Bearer " + accessToken,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							device_ids: [device_id],
						}),
					});
				});

				player.addListener("not_ready", ({ deviceId }) => {
					console.log("not ready", deviceId);
				});

				player.connect();
			};
		}
	}, [accessToken]);

	return (
		<section>
			<h1>Test</h1>
			<button
				id="playButton"
				onClick={() => {
					play();
				}}
			>
				Play
			</button>
			<button
				onClick={() => {
					test();
				}}
			>
				Test
			</button>
			<h1>{playing ? "playing" : "stopped"}</h1>
		</section>
	);
}
