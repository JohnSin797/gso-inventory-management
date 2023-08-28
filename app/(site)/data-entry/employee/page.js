'use client'

import axios from "axios"
import { useEffect, useState } from "react"

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

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-3/5 border rounded p-6 space-y-2 h-72 scroll-y">
                <table className="table-fixed border-separate border border-slate-600 w-full">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Department</th>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(employees)}
                        {employees.map((item)=>{
                            return (<tr key={item.id}>
                                <td className="border border-slate-600">{item.first_name}</td>
                                <td className="border border-slate-600">{item.last_name}</td>
                                <td className="border border-slate-600">{item.department}</td>
                                <td className="border border-slate-600">{item.username}</td>
                                <td className="border border-slate-600">
                                    <button className="p-2 w-full text-xs border rounded">get password</button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}