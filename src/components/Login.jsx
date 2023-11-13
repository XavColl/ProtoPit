import { useState } from "react"
import login from "../../lib/login"
import { Navigate } from "react-router-dom"

export default function Login() {
    const [navigate, setNavigate] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()
      await login(email,password)
      setNavigate(true)
    }

    if(navigate){
        return <Navigate to='/ProtoPit/dashboard' />
    }


  return (
    <form>
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        <button type="submit" onClick={e => handleSubmit(e)}>Login</button>
    </form>
  )
}
