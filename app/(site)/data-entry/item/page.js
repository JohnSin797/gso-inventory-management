'use client'

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

    useEffect(()=>{
        getItems()
    },[])

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-3/5 border rounded p-6 space-y-2">
                <div className="block border border-slate-600 h-72 scroll overflow-auto">
                    <table className="table-auto md:table-fixed border-separate w-full">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Code</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                <th>Employee</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, id)=>{
                                return (
                                    <tr key={id}>
                                        <td className="border border-slate-600">{item.item_name}</td>
                                        <td className="border border-slate-600">{item.barcode_text}</td>
                                        <td className="border border-slate-600">{item.quantity}</td>
                                        <td className="border border-slate-600">{item.cost}</td>
                                        <td className="border border-slate-600">{item.employee?.first_name} {item.employee?.last_name}</td>
                                        <td className="border border-slate-600">{item.department?.department_name}</td>
                                        <td className="border border-slate-600">
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