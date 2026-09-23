import { useNavigate,Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"

const Register = () => {


    const [username,setUsername] = useState("")
    const [email ,setEmail ]= useState("")
    const [password,setPassword] = useState("")

    const {loading, handleRegister} = useAuth()

    const navigate = useNavigate()

    
    const handleSubmit=async (e)=>{
        e.preventdefault
        await handleRegister({username,email, password})
        navigate("/")
    }

    if(loading){
      return  (<main><h1>Loading.......</h1></main>)
    }

  return (
      <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                 <div className="input-group">
                <label htmlFor="name">Name</label>
                <input  onChange={(e)=>{setUsername(e.target.value)}}
                type="text" name='name'  placeholder='Enter Name' />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input  onChange={(e)=>{setEmail(e.target.value)}}type="email" name='email'  placeholder='Enter Email' />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='Enter password' />
            </div>
            <button className='button'>Register</button>
            </form> 

            <p>Already have an account? <Link to={"/login"}> Login</Link></p>
        </div>
      </main>
  )
}

export default Register
