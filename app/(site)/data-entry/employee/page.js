'use client'

import DeleteEmployee from "@/app/components/deleteButtons/deleteEmployee"
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

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-3/5 border rounded p-6 space-y-2">
                <div className="block border border-slate-600 h-72 scroll overflow-auto">
                    <table className="table-auto md:table-fixed border-separate w-full">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Office</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((item, id)=>{
                                return (
                                    <tr key={id}>
                                        <td className="border border-slate-600">{item?.first_name}</td>
                                        <td className="border border-slate-600">{item?.last_name}</td>
                                        <td className="border border-slate-600">{item?.department?.department_name}</td>
                                        <td className="border border-slate-600">{item?.department?.office_name}</td>
                                        <td className="border border-slate-600">{item?.position}</td>
                                        <td className="border border-slate-600">{item?.employment_status}</td>
                                        <td className="border border-slate-600 space-x-1 flex">
                                            <button
                                                className="w-1/2 hover:font-bold hover:bg-green-900 bg-green-600"
                                            >
                                                edit
                                            </button>
                                            {/* <button
                                                className="w-1/2 hover:font-bold hover:bg-red-900 bg-red-600"
                                            >
                                                delete
                                            </button> */}
                                            <DeleteEmployee onSetEmployees={setEmployees} employeeId={item._id} />
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