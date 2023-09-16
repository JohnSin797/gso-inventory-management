'use client';

import Navigation from "@/app/components/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function User () {

    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: generatePassword()
    })

    const getUserData = async () => {
        try {
            await axios.get('/api/user/index')
            .then(res=>{
                setUsers(res.data.data)
                console.log(res)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getUserData()
    }, [])

    const deleteUser = async (id) => {
        try {
            await axios.post('/api/user/delete', {id:id})
            .then(res=>{
                setUsers(res.data.data)
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const addUser = async (e) => {
        try {
            e.preventDefault()
            await axios.post('/api/user/register', newUser)
            .then(res=>{
                setNewUser(res.data.data)
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewUser({
            ...newUser,
            [name]: value
        })
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
        setNewUser({
          ...newUser,
          password: newPassword,
        })
    }

    return (
        <div>
            <Navigation />
            <div className="p-6 pt-20">
                User
                <form onSubmit={addUser} className="w-full">
                    <div className="md:flex md:space-x-2">
                        <div className="w-full md:w-1/3">
                            <label className="text-xs font-bold">Username</label>
                            <input 
                                type="text"
                                className="w-full p-1"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                value={newUser.username}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <label className="text-xs font-bold">Password</label>
                            <input 
                                type="text"
                                className="w-full p-1"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={newUser.password}
                                required
                            />
                        </div>
                        <div className="w-full pt-4 md:w-1/3 md:p-6">
                            <button 
                                type="button"
                                className="p-1 w-full border"
                                onClick={()=>{generateNewPassword()}}
                            >
                                new password
                            </button>
                        </div>
                    </div>
                    <div className="md:flex md:space-x-2">
                        <div className="w-full md:w-1/3">
                            <label className="text-xs font-bold">First Name</label>
                            <input 
                                type="text"
                                className="w-full p-1"
                                placeholder="First Name"
                                name="first_name"
                                onChange={handleChange}
                                value={newUser.first_name}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <label className="text-xs font-bold">Last Name</label>
                            <input 
                                type="text"
                                className="w-full p-1"
                                placeholder="Last Name"
                                name="last_name"
                                onChange={handleChange}
                                value={newUser.last_name}
                                required
                            />
                        </div>
                        <div className="w-full pt-4 md:w-1/3 md:p-6">
                            <button 
                                className="p-1 w-full border"
                                type="submit"
                            >
                                add user
                            </button>
                        </div>
                    </div>
                </form>
                <div className="w-full h-80 overflow-scroll">
                    <table className="w-full table-auto  border">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item,id)=>{
                                    return (
                                        <tr key={id}>
                                            <td>{item?.first_name} {item?.last_name}</td>
                                            <td>{item?.username}</td>
                                            <td>{item?.password}</td>
                                            <td className="flex space-x-2">
                                                <button
                                                    className="w-1/2 p-1 bg-green-400"
                                                >
                                                    edit
                                                </button>
                                                <button
                                                    className="w-1/2 p-1 bg-red-400 hover:bg-red-900"
                                                    onClick={()=>deleteUser(item._id)}
                                                >
                                                    delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}