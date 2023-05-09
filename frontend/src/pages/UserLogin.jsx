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
		<section className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-black text-4xl font-bold">Welcome Back</h1>
			<div className="flex flex-col h-1/2 p-4 rounded-lg justify-evenly">
				<form className="flex flex-col gap-4">
					<input type='text' placeholder='Username' onChange={(input) => {setUsername(input.target.value)}} className='loginInput'></input>
					<input type='password' placeholder='Password' onChange={(input) => {setPassword(input.target.value)}} className='loginInput'></input>
				</form>
				<button onClick={loginCall} className='w-full rounded-lg bg-black text-white py-2 font-semibold'>Login</button>
			</div>
		</section>
	)
}
export default UserLogin
