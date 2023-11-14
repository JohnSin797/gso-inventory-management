'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Office () {

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

    const confirmDelete = id => {
        Swal.fire({
            title: 'Continue?',
            icon: 'warning',
            text: 'Are you sure you want to delete? Once deleted, it can not be restored.',
            showCancelButton: true,
            showConfirmButton: true,
        })
        .then(res=>{
            if (res.isConfirmed) {
                destroy(id)
            }
        })
    }

    const destroy = async id => {
        try {
            await axios.post('/api/department/destroy', {id: id})
            .then(res=>{
                getData()
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                Swal.fire(err.response.data.message)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <div className="w-full h-96">
                        <table className="w-full table-fixed">
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
                                                <td className="p-2">{item.department_name}</td>
                                                <td className="p-2">{item.office_name}</td>
                                                <td className="flex gap-2 p-2">
                                                    <button
                                                        onClick={()=>restoreOffice(item._id)}
                                                        className="p-2 rounded-lg bg-teal-600 hover:bg-teal-600/80 text-white w-full"
                                                    >
                                                        restore
                                                    </button>
                                                    <button
                                                        onClick={()=>confirmDelete(item._id)}
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