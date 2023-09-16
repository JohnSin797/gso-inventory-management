'use client';

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Create () {

    const [department, setDepartment] = useState('')
    const [office, setOffice] = useState('')

    const save = async () => {
        try {
            await axios.post('/api/department/create', {department_name: department, office_name: office})
            .then(res=>{
                console.log(res)
                setDepartment('')
                setOffice('')
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-3/5 border rounded p-6 md:px-20 space-y-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Department Name"
                        onChange={(e)=>setDepartment(e.target.value)}
                        value={department}
                        required
                    />
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Office Name"
                        onChange={(e)=>setOffice(e.target.value)}
                        value={office}
                        required
                    />
                    <div className="flex space-x-2">
                        <button
                            className="p-1 w-1/2 bg-slate-600 hover:bg-cyan-900 rounded"
                            onClick={save}
                        >
                            save
                        </button>
                        <Link href={'/data-entry/department'} className="block text-center p-1 w-1/2 bg-slate-600 hover:bg-cyan-900 rounded">back</Link>
                    </div>
            </div>
        </div>
    )
}