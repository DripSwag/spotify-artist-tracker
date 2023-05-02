import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

function UserHomepage(){
	const location = useLocation()
	const [accessCode, setAccessCode] = useState()

	const getAccessCode = async () => {
		const spotifyAccessCode = await fetch('http://127.0.0.1:8000/api/spotifyAccessCodeUpdate/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: location.state.id,
				code: location.state.authorization_code
			})
		})

		spotifyAccessCode.status === 201 ? setAccessCode(true) : setAccessCode(false)
	}

	useEffect(() => {
		getAccessCode()
	}, [getAritstIds])

	return(
		<section>
			<button onClick={() => {console.log(accessCode)}}>accessCode</button>
		</section>
	)
}
export default UserHomepage
