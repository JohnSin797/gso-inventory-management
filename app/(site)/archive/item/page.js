'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import Swal from "sweetalert2";

export default function Item () {

    const [archive, setArchive] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const restore = async (id) => {
        try {
            await axios.post('/api/item/archive', {id:id})
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
    
    const getData = async () => {
        try {
            setIsLoading(true)
            await axios.get('/api/item/archive')
            .then(res=>{
                setArchive(res.data.data)
                setIsLoading(false)
            })
            .catch(err=>{
                console.log(err)
                setIsLoading(false)
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
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
            await axios.post('/api/item/destroy', {id: id})
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
                <div className="w-full rounded-lg bg-white shadow-md p-6">
                    <p className="text-center text-2xl font-bold">Items</p>
                    <div className="w-full h-96 overflow-y-scroll">
                        {
                            isLoading ?
                            <div className="relative w-full h-full">
                                <div className="absolute w-full h-full bg-slate-900 text-white flex justify-center items-center">
                                    <ImSpinner10 className="w-5 h-5 animate-spin" />
                                </div>
                            </div>
                            :
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Property Number</th>
                                        <th>Barcode</th>
                                        <th>Unit</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        archive.map((item, index)=>{
                                            return(
                                                <tr key={index} className="border border-slate-900">
                                                    <td className="p-2 border border-slate-900">{item.item_name}</td>
                                                    <td className="p-2 border border-slate-900">{item.property_number}</td>
                                                    <td className="p-2 border border-slate-900">{item.barcode_text}</td>
                                                    <td className="p-2 border border-slate-900">{item.unit}</td>
                                                    <td className="text-white flex gap-2 p-2">
                                                        <button
                                                            onClick={()=>restore(item._id)}
                                                            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-500/80 w-full"
                                                        >
                                                            restore
                                                        </button>
                                                        <button
                                                            onClick={()=>confirmDelete(item._id)}
                                                            className="p-2 rounded-lg bg-red-600 hover:bg-red-600/80 w-full"
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
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}