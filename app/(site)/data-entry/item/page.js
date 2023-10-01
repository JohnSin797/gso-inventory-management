'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import Link from "next/link";
import axios from "axios";
import DateFrame from "@/app/components/dateFrame";
import { useEffect, useState } from "react";

export default function Item () {

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
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white p-6 rounded-lg shadow-md">
                    <Link
                        href={'/data-entry/item/create'}
                        className="block w-full md:w-1/3 p-2 rounded-lg bg-blue-600 text-center text-white hover:bg-blue-600/80"
                    >
                        new item
                    </Link>
                </div>
                <div className="w-full bg-white p-6 rounded-lg h-96 overflow-scroll shadow-md">
                    <table className="w-full table-auto">
                        <thead className="bg-slate-800 text-gray-400 border border-slate-600">
                            <tr>
                                <th>Added By</th>
                                <th>Item Name</th>
                                <th>Property Number</th>
                                <th>Date Acquired</th>
                                <th>Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, id)=>{
                                return (
                                    <tr key={id} className="hover:bg-gray-900/50 hover:text-white">
                                        <td className="p-2 border border-slate-600">{item?.user?.first_name} {item?.user?.last_name}</td>
                                        <td className="p-2 border border-slate-600">{item?.item_name}</td>
                                        <td className="p-2 border border-slate-600">{item?.property_number}</td>
                                        <td className="p-2 border border-slate-600"><DateFrame dateStr={item?.createdAt} /></td>
                                        <td className="p-2 border border-slate-600">{item?.unit}</td>
                                        <td className="p-2 border border-slate-600 h-auto flex text-white gap-2">
                                            <Link
                                                href={`/data-entry/item/edit/${item?._id}`}
                                                className="block w-full md:w-1/2 text-center bg-green-600 hover:bg-green-900"
                                            >
                                                edit
                                            </Link>
                                            <button
                                                className="w-full md:w-1/2 bg-red-600 hover:bg-red-900"
                                                onClick={()=>deleteItem(item?._id)}
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
            </div>
        </div>
    )
}