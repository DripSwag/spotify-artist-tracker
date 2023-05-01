import { useLocation } from "react-router-dom"

function UserHomepage(){
	const location = useLocation()

	return(
		<section>
			<p>{location.state.id}</p>
			<p>{location.state.authorization_code}</p>
		</section>
	)
}
export default UserHomepage
