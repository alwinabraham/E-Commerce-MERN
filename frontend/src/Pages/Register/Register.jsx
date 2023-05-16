import React, {useState,useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';
import { useCookies } from 'react-cookie'

const Register = () => {

    const [cookies,setCookie,removeCookie] = useCookies([])
    const navigate = useNavigate();
    
    const verifyUser = async ()=>{
        if(cookies.jwt){
          navigate("/")
        }
    }
    useEffect(() => {
        verifyUser();
    }, [])

    const [name, setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword,setRepeatPassword] = useState("")
    const [phoneno,setPhoneno] = useState("")
    
    const generateError = (err) => toast.error(err,{
        position:"bottom-right"
    })

    const handleSubmit = async e =>{
        e.preventDefault()

        if(!name || !lastName || !email || !password || !repeatPassword || !phoneno){
            generateError("Please fill in all fields")
            return
        }
        if(!email.includes('@')){
            generateError("Please enter a valid email address")
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            generateError("Please enter a valid email address");
            return;
        }
        if (password !== repeatPassword) {
            generateError("Passwords do not match")
            return
          }
        if (!/^[a-zA-Z]+$/.test(name) || !/^[a-zA-Z]+$/.test(lastName)) {
            generateError("Name and last name should contain only letters");
            return;
        }

        const UserData = {
            name,
            lastName,
            email,
            password,
            phoneno
        }

        try {
            const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/register`, UserData,{
                withCredentials:true
            })
            if(data){
                if(data.errors){
                    const {name,lastName,email,password,phoneno} = data.errors;
                    if(name) generateError(name)
                    else if(lastName) generateError(lastName)
                    else if(email) generateError(email)
                    else if(password) generateError(password)
                    else if(phoneno) generateError(phoneno)
                }else{
                    navigate("/")
                }
            }
            }catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-violet-900 ...">
            <div className='w-96 p-6 shadow-lg bg-gray-800 rounded-md '>
                <h1 className='text-3xl block text-center font-semibold text-gray-200 pb-3'>Register</h1>
                <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className='block mb-2 text-gray-200'>First Name</label>
                    <input type="name" name="name" 
                    className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
                    placeholder='First Name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="name" className='block text-gray-200 mb-2'>Last Name</label>
                    <input type="name" name="name" 
                    className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
                    placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='block text-gray-200 mb-2'>Email</label>
                    <input type="email" name="email" 
                    className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
                    placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='block text-gray-200 mb-2'>Password</label>
                    <input type="password" name="password" 
                    className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
                    placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="repeatPassword" className='block text-gray-200 mb-2'>Repeat Password</label>
                    <input type="password" name="repeatPassword" 
                    className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
                    placeholder='Repeat Password' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="phoneno" className='block text-gray-200 mb-2'>Phone Number (Enter your Country Code)</label>
                    <input type="phoneno" name="phoneno" 
                    className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
                    placeholder='Phone No' value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} />
                </div>
                <div className='flex justify-between items-center'>
                    <div className='text-gray-300'>
                    Already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <button type='submit' className='border-2 border-gray-900 bg-gray-900 text-white py-1 px-5 w-full rounded-md h hover:text-gray-500 font-semibold'>Register</button>
                </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register