'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Search ({ params }) {

    const [searchResult, setSearchResult] = useState([])

    useEffect(()=>{
        const getData = async () => {
            try {
                await axios.post('/api/navigation/search', {search: params.slug})
                .then(res=>{
                    setSearchResult(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg shadow-md p-6 flex">
                    <Link
                        href={'/'}
                        className="block w-full md:w-1/3 rounded-lg p-2 text-center text-white bg-slate-900 hover:bg-slate-900/80"
                    >
                        back
                    </Link>
                </div>
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <div className="w-full h-96 overflow-scroll">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Department</th>
                                    <th>Item Name</th>
                                    <th>Property Number</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchResult.map((item,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{item?.employee?.first_name} {item?.employee?.last_name}</td>
                                                <td>{item?.department?.department_name}</td>
                                                <td>{item?.item?.item_name}</td>
                                                <td>{item?.item?.property_number}</td>
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