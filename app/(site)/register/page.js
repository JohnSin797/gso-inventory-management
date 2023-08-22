'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Swal from "sweetalert2"

export default function Register() {
    const router = useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [strength, setStrength] = useState("");

    const validateUsername = async () => {
        axios.post('/api/user', {username:userName})
        .then(res=>{
            setUsernameError(res.data.message)
            return true
        })
        .catch(err=>{
            return false
        })
    }

    const validatePassword = (e) => {
        setPassWord(e.target.value);
        const isStrongRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{10,15})/;
        const isMediumRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,15})/;
        if(isStrongRegex.test((passWord))) {
            setStrength('strong')
            return false
        }
        else if(isMediumRegex.test(passWord)) {
            setStrength('medium')
            return false
        }
        else {
            setStrength('weak')
            return true
        }
    }

    const register = async () => {
        if(validateUsername()) {}
        else if(firstName != '' && lastName != '' && userName != '' && passWord != '') {
            axios.post('/api/user/register', {first_name:firstName,last_name:lastName,username:userName,passWord:passWord})
            .then(res => {
                console.log('res', res.data.message);
                router.push('/')
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: err.response.data.message
                })
            });
        }
        else {
            alert('Please fill in all the fields before you proceed.')
        }
    }

    return(
        <div className="absolute flex items-center justify-center h-full w-full">
            <div className="p-6 border border-cyan-400 rounded md:w-1/4 space-y-2">
                <p className="text-2xl">General Service Office</p>
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="First Name"
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Last Name"
                    onChange={(e)=>setLastName(e.target.value)}
                />
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Username"
                    onChange={(e)=>setUserName(e.target.value)}
                />
                <p className="block h-4 text-red-600 text-xs text-center">{usernameError}</p>
                <input 
                    type="password" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Password"
                    onChange={validatePassword}
                />
                <div className="flex space-x-1">
                    <div className={`w-1/3 border ${strength == 'strong' ? 'border-cyan-400' : strength == 'weak' ? 'border-red-600' : strength == 'medium' ? 'border-green-600' : 'border-gray-300'}`}></div>
                    <div className={`w-1/3 border ${strength == 'strong' ? 'border-cyan-400' : strength == 'medium' ? 'border-green-600' : 'border-gray-300'}`}></div>
                    <div className={`w-1/3 border ${strength == 'strong' ? 'border-cyan-400' : 'border-gray-300'}`}></div>
                </div>
                <p className="block h-3 text-xs text-right text-gray-300">{strength}</p>
                <p className="block h-4 text-red-600 text-xs text-center">{passwordError}</p>
                <div className="flex justify-between">
                    <button 
                        className="p-1 w-1/2 border-cyan-400 hover:bg-cyan-400 hover:text-black hover:font-bold"
                        onClick={register}
                    >
                        register
                    </button>
                    <Link 
                        href={'/login'}
                        className="p-1 w-1/2 block border-cyan-400 text-center hover:bg-cyan-400 hover:text-black hover:font-bold"
                    >
                        login
                    </Link>
                </div>
            </div>
        </div>
    )
}