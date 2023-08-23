'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import jwt from "jsonwebtoken";

export default function Login() {

    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const error = {};

        if(!userName.trim()) {
            error.username = 'Username is requried';
        }

        if(!passWord.trim()) {
            error.password = 'Password is required';
        }

        setErrors(error);
        return Object.keys(error).length === 0;
    }

    const logIn = async () => {
        const isFormValid = validateForm()

        if(isFormValid) {
            try {
                const response = await axios.post('/api/user/login', {username: userName, password: passWord})
                // const decoded = jwt.verify(response.data.token, 'gsoinventorymanagementsystem')
                // console.log(decoded)
                router.replace('/')
            } catch (error) {
                console.log(error.response.status)
                if(error.response.status == 401) {
                    setErrors({
                        username: error.response.data.message
                    })
                }
                else if(error.response.status == 402) {
                    setErrors({
                        password: error.response.data.message
                    })
                } else {
                    Swal.fire({
                        title: 'Login Error',
                        icon: 'error',
                        text: error.response.data.message
                    })
                }
            }
        }
    }

    return(
        <div className="absolute flex items-center justify-center h-full w-full">
            <div className="p-6 border border-cyan-400 rounded md:w-1/4 space-y-2">
                <p className="text-2xl">General Service Office</p>
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Username"
                    onChange={(e)=>setUserName(e.target.value)}
                />
                <p className="block h-4 text-red-600 text-xs text-center">{errors.username}</p>
                <input 
                    type="password" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Password"
                    onChange={(e)=>setPassWord(e.target.value)}
                />
                <p className="block h-4 text-red-600 text-xs text-center">{errors.password}</p>
                <div className="flex justify-between">
                    <button 
                        className="p-1 w-1/2 border-cyan-400 hover:bg-cyan-400 hover:text-black hover:font-bold"
                        onClick={logIn}
                    >
                        login
                    </button>
                    <Link 
                        href={'/register'}
                        className="p-1 w-1/2 block border-cyan-400 text-center hover:bg-cyan-400 hover:text-black hover:font-bold"
                    >
                        register
                    </Link>
                </div>
            </div>
        </div>
    )
}