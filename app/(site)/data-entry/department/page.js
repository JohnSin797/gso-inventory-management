'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Department () {
    const [department, setDepartment] = useState([])

    const getDepartment = async () => {
        try {
            await axios.get('/api/department/data-entry')
            .then(res=>{
                console.log(res)
                setDepartment(res.data.data)
            })
            .catch(err=>{})
        } catch (error) {

        }
    }

    useEffect(()=>{
        getDepartment()
    }, [])

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-3/5 border rounded p-6 space-y-2">
                <div className="block border border-slate-600 h-72 scroll overflow-auto">
                    {
                        department.map((item, id)=>{
                            return(
                                <p key={id} className="block p-1 md:pl-10 w-full flex justify-between">{item.department_name}
                                    <div className="flex space-x-1 w-2/5">
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
                                    </div>
                                </p>
                            )
                        })
                    }
                </div>
                <Link 
                    href={'/data-entry/department/create'} 
                    className="block p-1 w-full text-center border rounded hover:font-bold hover:bg-cyan-900"
                >
                    new department
                </Link>
            </div>
        </div>
    )
}