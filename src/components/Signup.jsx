import { useState } from "react"
import signup from "../../lib/signup"
import login from "../../lib/login"
import { Navigate } from "react-router-dom"
//import { Navigate } from "react-router-dom"

export default function Signup() {

    const [navigate, setNavigate] = useState(false)
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username,email,password)
        await login(email,password)
        setNavigate(true)
    }

    if(navigate){
      return <Navigate to='/dashboard' />
    }


  return (
    <form>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        <button type="submit" onClick={e => handleSubmit(e)}>Sign Up</button>
    </form>
  )
}