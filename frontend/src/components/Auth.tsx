import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignupInputs } from '@ravivvaniya/ravi'
import axios from 'axios'
import {BACKEND_URL} from '../config'

const Auth = ({type}: {type: "signup" | "signin"}) => {
const navigate = useNavigate();
const [postInputs, setPostInputs] = useState<SignupInputs>({
    name: "",
    username: "",
    password: ""
})

async function sendRequest(){
   try{
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs);
    
    const jwt = response.data;
    localStorage.setItem("token", jwt)
    navigate("/blogs")
   } catch(e){
        alert("Error while signing up")
   }

}
  return (
    <div className='h-screen flex justify-center flex-col'>
        <div className='flex justify-center'>
            <div className='px-10'>
                <div className='text-3xl font-extrabold px-10'>
                    {type === "signin" ? "Login Into Your Account" : "Create an account"}
                </div>
                <div className='text-slate-400 px-10'>
                   {type === "signin"?  "Don't have an account want to Signup?": "Already have an account?"}
                   <Link to={type === "signin" ? "/signup" : "/signin"} className='pl-2 underline'>{type === "signin" ? "SignUp" : "SignIn"}</Link>
                </div>
                <div className='mt-5'>
                    {type=== "signup" ? <LabelledInput label= {"Name"} placeholder={"Enter your name"} onChange={(e)=>{
                       setPostInputs({
                        ...postInputs, name: e.target.value
                       })
                    }} /> : null}
                </div>
                <div className='mt-5'>
                    <LabelledInput label= {"Username"} placeholder={"Enter your Username"} onChange={(e)=>{
                       setPostInputs({
                        ...postInputs, username: e.target.value
                       })
                    }} />
                </div>
                <div className='mt-5'>
                    <LabelledInput label= {"Password"} placeholder={"Enter your Password"} onChange={(e)=>{
                       setPostInputs({
                        ...postInputs, password: e.target.value
                       })
                    }}  types='password'/>
                </div>
                <div className='mt-7'>
                <button type="button" onClick={sendRequest} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">{type === "signin" ? "Sign in" : "Sign up"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

interface label{
    label: string;
    placeholder: string;
    onChange:(event:  React.ChangeEvent<HTMLInputElement>)=>void;
    types?: string
}

function LabelledInput({label, placeholder, onChange, types}: label){
    return <div>
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-semibold">{label}</label>
    <input type={types} id="first_name" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}required />
</div>
}

export default Auth