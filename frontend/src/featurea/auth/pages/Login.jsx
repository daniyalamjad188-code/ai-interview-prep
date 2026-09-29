import React from 'react'
import "../authForm.scss"
import {Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Login = () => {

    const {loading ,handleLogin} = useAuth()
    const navigate = useNavigate()

    const [email,setEmail] =useState("")
    const [password,setPassword] = useState("")
    const [error,setError]= useState("")

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
        await handleLogin({email, password})
        navigate("/")}
      catch(error){
    setError(error.response.data.message)
}
    }

    if(loading){
      return  (<main><h1>Loading.......</h1></main>)
    }


  return (
      <main>
        <div className="form-container">
            <h1>Login</h1>
            <form  onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                <input 
                onChange={(e)=>{setEmail(e.target.value)}}
                type="email" name='email'  placeholder='Enter Email' />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password" name='password' placeholder='Enter password' />
            </div>
            {error && <p>{error}</p>}
            <button className='button'>Login</button>
            </form> 

             <p>Don't have an account?<Link to={"/register"}> Register</Link></p>
        </div>
      </main>
  )
}

export default Login


