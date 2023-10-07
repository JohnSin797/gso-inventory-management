'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import Link from "next/link";
import { useState } from "react";

export default function Archive () {

    const [archive, setArchive] = useState([])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg shadow-md p-6 flex gap-2">
                    <Link
                        href={'/data-entry/item'}
                        className="block p-2 w-1/2 md:w-1/3 rounded-lg bg-slate-900 hover:bg-slate-900/80 text-white text-center"
                    >
                        back
                    </Link>
                </div>
                <div className="w-full rounded-lg bg-white shadow-md p-6">
                    <p className="text-center text-2xl font-bold">Items</p>
                    <div className="w-full h-96">
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
                                                <td className="text-white space-y-2 border border-slate-900">
                                                    <button
                                                        className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-500/80"
                                                    >
                                                        restore
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-lg bg-red-600 hover:bg-red-600/80"
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