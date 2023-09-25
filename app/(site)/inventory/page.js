'use client';

import DateFrame from "@/app/components/dateFrame";
import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Department () {

    const [stocks, setStocks] = useState([])
    const [borrowedItems, setBorrowedItems] = useState([])

    const getData = async () => {
        try {
            await axios.get('/api/inventory/index')
            .then(res=>{
                setStocks(res.data.data)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg p-6 shadow-md flex gap-2">
                    <Link
                        href={'/inventory/stock'}
                        className="block w-1/3 p-2 rounded-lg bg-blue-600 hover:bg-blue-600/80 text-center text-white"
                    >
                        add stock
                    </Link>
                    <Link
                        href={'/inventory/release'}
                        className="block w-1/3 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-600/80 text-center text-white"
                    >
                        borrow item
                    </Link>
                </div>
                <div className="w-full bg-white rounded-lg p-6 shadow-md h-96 overflow-scroll">
                    <p className="text-2xl font-bold">Borrowed Items</p>
                    <table className="w-full table-auto">
                        <thead className="bg-slate-800 text-gray-400">
                            <tr>
                                <th>Office</th>
                                <th>Employee</th>
                                <th>Item Description</th>
                                <th>Property Number</th>
                                <th>Date Issued</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                <th>Employee</th>
                                <th>Returned</th>
                                <th>Position</th>
                                <th>Employment Status</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div className="w-full bg-white rounded-lg p-6 shadow-md h-96 overflow-scroll">
                    <p className="text-2xl font-bold">Stocks</p>
                    <table className="w-full table-auto border border-slate-600">
                        <thead className="bg-slate-800 text-gray-400">
                            <tr>
                                <th>Item Name</th>
                                <th>Item Description</th>
                                <th>Property Number</th>
                                <th>Date Issued</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stocks.map((item,id)=>{
                                    return(
                                        <tr key={id} className="hover:bg-gray-900/50 hover:text-white">
                                            <td className="p-2 border border-slate-600">{item?.item?.item_name}</td>
                                            <td className="p-2 border border-slate-600">{item?.item?.description}</td>
                                            <td className="p-2 border border-slate-600">{item?.item?.property_number}</td>
                                            <td className="p-2 border border-slate-600"> <DateFrame dateStr={item?.date_acquired} /> </td>
                                            <td className="p-2 border border-slate-600">{item?.cost}</td>
                                            <td className="p-2 border border-slate-600">{item?.current_quantity}</td>
                                            <td className="p-2 border border-slate-600 flex space-x-2 text-white">
                                                <button
                                                    className="w-1/2 p-1 bg-green-600 hover:bg-green-600/80"
                                                >
                                                    edit
                                                </button>
                                                <button
                                                    className="w-1/2 p-1 bg-red-600 hover:bg-red-600/80"
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
    )
}