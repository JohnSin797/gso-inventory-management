'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Swal from "sweetalert2"
import PasswordStrengthChecker from "@/app/components/PasswordStrengthChecker"

export default function Register() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
      });
    const [errors, setErrors] = useState({})
    const [strength, setStrength] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(false)

    // const handleStrengthChange = (strength) => {
    //     setTimeout(() => {
    //         setStrength(strength)
    //     }, 500)
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // useEffect(() => {
    //     if (strength == 'weak') {
    //         setErrors({
    //             ...errors,
    //             password: 'Password is too weak. It must be at least medium strength.'
    //         })
    //         Swal.fire({
    //             title: 'Password Error',
    //             icon: 'error',
    //             text: 'Password should be alphanumeric and contain at least 1 uppercase character.'
    //         })
    //     } else {
    //         setErrors({
    //             ...errors,
    //             password: ''
    //         })
    //     }
    // }, [strength, errors])

    const validateForm = () => {
        const errors = {};

        validateUsername()

        if (!isUsernameValid) {
            errors.username = 'Username already exists.';
        }
        
        if (!formData.username.trim()) {
            errors.username = 'Username is required.';
        }

        if (!formData.first_name.trim()) {
            errors.first_name = 'First Name is required.';
        }

        if (!formData.last_name.trim()) {
            errors.last_name = 'Last Name is required.';
        }

        if(strength == 'weak') {
            errors.password = 'Password is too weak.';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required.';
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };

    const validateUsername = async () => {
        axios.post('/api/user', {username:formData.username})
        .then(res=>{
            setIsUsernameValid(false)
        })
        .catch(err=>{
            setIsUsernameValid(true)
        })
    }

    const register = async () => {
        setTimeout(()=>{
            const isFormValid = validateForm()
            if(errors.password) {
                Swal.fire({
                    title: 'Password Error',
                    icon: 'error',
                    text: 'Password should be alphanumeric and contain at least 1 uppercase character.'
                })
            }
            if(isFormValid) {
                axios.post('/api/user/register', formData)
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
        },1000)
    }

    return(
        <div className="absolute flex items-center justify-center h-full w-full">
            <div className="p-6 border border-cyan-400 rounded md:w-1/3 space-y-2">
                <p className="text-2xl text-center">General Service Office</p>
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <p className="block h-4 text-red-600 text-xs text-center">{errors.first_name}</p>
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <p className="block h-4 text-red-600 text-xs text-center">{errors.last_name}</p>
                <input 
                    type="text" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <p className="block h-4 text-red-600 text-xs text-center">{errors.username}</p>
                <input 
                    type="password" 
                    className="w-full bg-black block border border-cyan-400 placeholder:text-cyan-400"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <PasswordStrengthChecker password={formData.password} onStrengthChange={setStrength} />
                <p className="block h-4 text-red-600 text-xs text-center">{errors.password}</p>
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