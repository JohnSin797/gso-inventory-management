'use client'

import Link from "next/link"
import { useState } from "react"
import { redirect } from "next/navigation"
import axios from "axios"

export default function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [passWord, setPassWord] = useState("")

    const register = async () => {
        if(firstName != '' && lastName != '' && userName != '' && passWord != '') {
            axios.post('/api/user', {first_name:firstName,last_name:lastName,username:userName,password:passWord})
            .then(res => {
                console.log('res', res.data.message);
                redirect('/');
            })
            .catch(err => {
                console.log('error in request', err);
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
                <input 
                    type="password" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Password"
                    onChange={(e)=>setPassWord(e.target.value)}
                />
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