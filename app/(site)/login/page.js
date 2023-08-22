'use client'

import { useState } from "react"
import Link from "next/link";

export default function Login() {

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    const logIn = () => {
        if(userName != '' && passWord != '') {

        }
        else {
            alert('Enter your username and password before you proceed.');
        }
    }

    return(
        <div className="absolute flex items-center justify-center h-full w-full">
            <div className="p-6 border border-cyan-400 rounded w-1/4 space-y-2">
                <p className="text-2xl">General Service Office</p>
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