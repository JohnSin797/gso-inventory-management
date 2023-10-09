'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Archive () {

    const [archive, setArchive] = useState([])

    const restoreOffice = async (id) => {
        try {
            await axios.post('/api/department/archive', {id:id})
            .then(res=>{
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await axios.get('/api/department/archive')
                .then(res=>{
                    setArchive(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <Link 
                        href={'/data-entry/office'}
                        className="block w-full md:w-1/3 p-2 rounded-lg bg-slate-900 hover:bg-slate-900/80 text-white text-center"
                    >
                        back
                    </Link>
                </div>
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <div className="w-full h-96">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th>Department</th>
                                    <th>Office</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    archive.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>{item.department_name}</td>
                                                <td>{item.office_name}</td>
                                                <td>
                                                    <button
                                                        onClick={()=>restoreOffice(item._id)}
                                                        className="p-2 rounded-lg bg-teal-600 hover:bg-teal-600/80 text-white w-full"
                                                    >
                                                        restore
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-lg bg-red-600 hover:bg-red-600/80 text-white w-full"
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
        </div>
    )
}