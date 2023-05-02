import { useState } from "react"
import { useNavigate } from "react-router-dom"

function UserLogin(){
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const [wrongPasswordPrompt, setWrongPasswordPrompt] = useState(false)

	const navigate = useNavigate()

	const getSpotifyCode = () => {
		const url = window.location.href
		const splittedUrl = url.split("=")
		return splittedUrl[1]
	}

	const loginCall = async () => {
		const url = `http://127.0.0.1:8000/api/userLogin/${username}/${password}`
		const response = await fetch(url)
		if(response.status == 404){
			setWrongPasswordPrompt(true)
		}
		else{
			navigate('/homepage', {
				state:{
					id: await response.json().then((data) => {return data['id']}),
					authorization_code: getSpotifyCode()
				}
			})
		}
	}

	return(
		<section>
			<h1>Homepage</h1>
			<form>
				<input type='text' placeholder='Username' onChange={(input) => {setUsername(input.target.value)}}></input>
				<input type='text' placeholder='Password' onChange={(input) => {setPassword(input.target.value)}}></input>
			</form>
			<button onClick={loginCall}>Login</button>
		</section>
	)
}
export default UserLogin
