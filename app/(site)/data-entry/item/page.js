'use client'

import DateFrame from "@/app/components/dateFrame"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Employee () {

    const [items, setItems] = useState([])

    const getItems = async () => {
        try {
            await axios.get('/api/item')
            .then(res=>{
                console.log(res)
                setItems(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteItem = async (id) => {
        try {
            await axios.post('/api/item/delete', {id:id})
            .then(res=>{
                setItems(res.data.data)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getItems()
    },[])

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-4/5 border rounded p-6 space-y-2">
                <div className="block border border-slate-600 h-72 scroll overflow-auto">
                    <table className="table-auto border-separate w-full">
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Item Name</th>
                                <th>Property Number</th>
                                <th>Employee</th>
                                <th>Data Issued</th>
                                <th>Cost</th>
                                <th>Returned</th>
                                <th>Remarks</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, id)=>{
                                return (
                                    <tr key={id}>
                                        <td className="border border-slate-600">{item.quantity}</td>
                                        <td className="border border-slate-600">{item.item_name}</td>
                                        <td className="border border-slate-600">{item.property_number}</td>
                                        <td className="border border-slate-600">{item?.employee?.first_name} {item?.employee?.last_name}</td>
                                        <td className="border border-slate-600"><DateFrame dateStr={item.createdAt} /></td>
                                        <td className="border border-slate-600">{item.cost}</td>
                                        <td className="border border-slate-600">{item?.returned}</td>
                                        <td className="border border-slate-600">{item?.remarks}</td>
                                        <td className="border border-slate-600 w-40 flex">
                                            <Link
                                                href={`/data-entry/item/edit/${item._id}`}
                                                className="block w-full md:w-1/2 text-center hover:font-bold bg-green-600 hover:bg-green-900"
                                            >
                                                edit
                                            </Link>
                                            <button
                                                className="w-full md:w-1/2 hover:font-bold bg-red-600 hover:bg-red-900"
                                                onClick={()=>deleteItem(item._id)}
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
                    href={'/data-entry/item/create'} 
                    className="block p-1 w-full text-center border rounded hover:font-bold hover:bg-cyan-900"
                >
                    new item
                </Link>
            </div>
        </div>
    )
}