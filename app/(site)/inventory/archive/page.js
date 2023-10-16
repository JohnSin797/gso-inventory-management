'use client';

import DateFrame from "@/app/components/dateFrame";
import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Archive () {

    const [archive, setArchive] = useState([])

    useEffect(()=>{
        const getData = async () => {
            try {
                await axios.get('/api/inventory/archive')
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
                <div className="bg-white rounded-lg p-6 shadow-md w-full">
                    <Link
                        href={'/inventory'}
                        className="block w-full md:w-1/3 p-2 rounded-lg bg-slate-900 hover:bg-slate-900/80 text-center text-white"
                    >
                        back
                    </Link>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 w-full">
                    <div className="w-full h-96 overflow-scroll">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th>Inventory Tag</th>
                                    <th>Item Name</th>
                                    <th>Property Number</th>
                                    <th>Date Deleted</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    archive.map((item,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>{item?.inventory_tag}</td>
                                                <td>{item?.item?.item_name}</td>
                                                <td>{item?.item?.property_number}</td>
                                                <td><DateFrame dateStr={item?.deletedAt} /></td>
                                                <td>
                                                    <button
                                                        className="p-2 rounded-lg bg-teal-600 hover:bg-teal-600/80 text-white"
                                                    >
                                                        restore
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