'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrengthChecker from "@/app/components/PasswordStrengthChecker"

export default function Create () {
    const router = useRouter()
    const [errors, setErrors] = useState({})
    const [strength, setStrength] = useState('')

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: generatePassword(),
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

        if(strength == 'weak') {
            error.password = 'Password is too weak'
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

    function generatePassword() {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_-+=<>?';
      
        const part1 = getRandomChar(uppercaseChars);
        const part2 = getRandomChar(specialChars);
        const part3 = getRandomChars(lowercaseChars + numberChars, 13);
      
        const password = part1 + part2 + part3;
      
        return shuffleString(password); 
    }
      
    function getRandomChar(characters) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters.charAt(randomIndex);
    }
      
    function getRandomChars(characters, length) {
        let result = '';
        for (let i = 0; i < length; i++) {
          result += getRandomChar(characters);
        }
        return result;
    }
      
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    const generateNewPassword = () => {
        const newPassword = generatePassword()
        setFormData({
          ...formData,
          password: newPassword,
        })
    }

    return (
        <div className="absolute top-60 w-full">
            <div className="flex justify-center items-center md:pt-10 px-5">
                <div className="md:w-2/5 border rounded p-6 space-y-2">
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <p className="block h-2 text-red-600 text-xs text-center">{errors.first_name}</p>
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <p className="block h-2 text-red-600 text-xs text-center">{errors.last_name}</p>
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <p className="block h-2 text-red-600 text-xs text-center">{errors.username}</p>
                    <div className="flex space-x-1">
                        <input 
                            type="text"
                            className="bg-black border-b w-full"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button 
                            className="text-xs p-1 border w-1/3 rounded"
                            onClick={generateNewPassword}
                        >
                            <small>new password</small>
                        </button>
                    </div>
                    <PasswordStrengthChecker password={formData.password} onStrengthChange={setStrength} />
                    <p className="block h-2 text-red-600 text-xs text-center">{errors.password}</p>
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    />
                    <p className="block h-2 text-red-600 text-xs text-center">{errors.department}</p>
                    <button
                        className="p-1 w-1/3 border rounded hover:bg-cyan-900"
                        onClick={createEmployee}
                    >
                        save
                    </button>
                </div>
            </div>
        </div>
    )
}