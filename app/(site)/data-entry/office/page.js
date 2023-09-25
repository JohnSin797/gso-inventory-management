'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Department () {

    const [offices, setOffices] = useState([])

    const getDepartment = async () => {
        try {
            await axios.get('/api/department/data-entry')
            .then(res=>{
                console.log(res)
                setOffices(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getDepartment()
    }, [offices])

    return (
        <div>
            <TopNav />  
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full p-6 bg-white rounded-lg shadow-md">
                    <Link
                        href={'/data-entry/office/create'}
                        className="block w-full md:w-1/3 p-2 rounded-lg bg-blue-600 text-center text-white hover:bg-blue-600/80"
                    >
                        new office
                    </Link>
                </div>
                <div className="w-full h-96 overflow-scroll p-6 bg-white rounded-lg shadow-md">
                    <table className="table-auto w-full border border-slate-900">
                        <thead className="bg-slate-800 text-gray-400">
                            <tr>
                                <th>Department</th>
                                <th>Office</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offices.map((item,id)=>{
                                    return(
                                        <tr key={id} className="hover:bg-gray-900/50 hover:text-white">
                                            <td className="p-2 border border-slate-900">{item?.department_name}</td>
                                            <td className="p-2 border border-slate-900">{item?.office_name}</td>
                                            <td className="flex gap-2 p-2 border border-slate-900 text-white">
                                                <button
                                                    className="w-1/2 p-1 bg-green-600 hover:bg-green-600/80"
                                                >
                                                    edit
                                                </button>
                                                <button
                                                    className="w-1/2 p-1 bg-red-600 hover:bg-red-600/80"
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