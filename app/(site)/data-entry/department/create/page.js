'use client';

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Create () {

    const [department, setDepartment] = useState('')

    const save = async () => {
        try {
            await axios.post('/api/department/create', {department_name: department})
            .then(res=>{
                console.log(res)
                setDepartment('')
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
            <div className="w-3/5 border rounded p-6 px-20 space-y-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Department Name"
                        onChange={(e)=>setDepartment(e.target.value)}
                        value={department}
                    />
                    <div className="flex space-x-2">
                        <Link href={'/data-entry/department'} className="block text-center p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded">back</Link>
                        <button
                            className="p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded"
                            onClick={save}
                        >
                            save
                        </button>
                    </div>
            </div>
        </div>
    )
}