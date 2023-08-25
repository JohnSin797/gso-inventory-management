'use client'

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create () {
    const router = useRouter()
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        department: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const validateForm = () => {
        const error = {}

        if(!formData.first_name.trim()) {
            error.first_name = 'First name is required'
        }

        if(!formData.last_name.trim()) {
            error.last_name = 'Last name is required'
        }

        if(!formData.username.trim()) {
            error.username = 'Username is required'
        }

        if(!formData.password.trim()) {
            error.password = 'Password is required'
        }

        if(!formData.department.trim()) {
            error.department = 'Department is required'
        }

        setErrors(error);
        return Object.keys(error).length === 0;
    }

    const createEmployee = async () => {
        const isFormValid = validateForm()
        try {
            if(isFormValid) {
                await axios.post('/api/user/create', formData)
                router.push('/data-entry/employee')
            }
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <div className="absolute top-60 w-full">
            <div className="flex justify-center items-center md:pt-10 px-5">
                <div className="md:w-2/5 border rounded p-6">
                    <form onSubmit={createEmployee} className="space-y-4">
                        <input 
                            type="text"
                            className="bg-black border-b w-full"
                            placeholder="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <p>{errors.first_name}</p>
                        <input 
                            type="text"
                            className="bg-black border-b w-full"
                            placeholder="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        <input 
                            type="text"
                            className="bg-black border-b w-full"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <input 
                            type="text"
                            className="bg-black border-b w-full"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input 
                            type="text"
                            className="bg-black border-b w-full"
                            placeholder="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                        <button
                            type="submit" 
                            className="p-1 w-1/6 rounded hover:bg-cyan-900"
                        >
                            save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}