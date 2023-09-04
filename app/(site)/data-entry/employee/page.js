'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Employee () {

    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        try {
            const response = axios.get('/api/employee')
            setEmployees((await response).data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getEmployees()
    },[])

    const showPassword = async (hiddenPassword) => {
        Swal.fire({
            icon: 'info',
            text: 'Enter your password to proceed.',
            input: 'password',
            showCancelButton: true,
        })
        .then(res=>{
            matchPassword(res.value, hiddenPassword)
        })
    }

    const matchPassword = async (pword, hiddenPassword) => {
        if(pword == '') {
            Swal.fire('Please enter your password.')
        }
        try {
            await axios.post('/api/user/match-password', {password: pword})
            .then(res=>{
                Swal.fire('Password: '+hiddenPassword)
            })
            .catch(err=>{
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.message
                })
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-3/5 border rounded p-6 space-y-2">
                <div className="block border border-slate-600 h-72 scroll overflow-auto">
                    <table className="table-auto md:table-fixed border-separate w-full">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((item, id)=>{
                                return (
                                    <tr key={id}>
                                        <td className="border border-slate-600">{item.first_name}</td>
                                        <td className="border border-slate-600">{item.last_name}</td>
                                        <td className="border border-slate-600">{item.department.department_name}</td>
                                        <td className="border border-slate-600">{item.username}</td>
                                        <td className="border border-slate-600 text-xs">
                                            {item.password}
                                        </td>
                                        <td className="border border-slate-600">
                                            <button
                                                className="w-1/2 hover:font-bold hover:bg-cyan-600"
                                            >
                                                edit
                                            </button>
                                            <button
                                                className="w-1/2 hover:font-bold hover:bg-red-600"
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Link 
                    href={'/data-entry/employee/create'} 
                    className="block p-1 w-full text-center border rounded hover:font-bold hover:bg-cyan-900"
                >
                    new user
                </Link>
            </div>
        </div>
    )
}