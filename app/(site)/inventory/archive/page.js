'use client';

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
                await axios.get('/api/release/index')
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}