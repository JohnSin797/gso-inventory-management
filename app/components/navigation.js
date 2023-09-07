'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./logout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navigation({ onSetUserRole }) {
    const currentPath = usePathname();
    const [userRole, setUserRole] = useState('')

    const getUserRole = async () => {
        await axios.get('/api/user')
        .then(res=>{
            setUserRole(res.data.role)
            onSetUserRole(res.data.role)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getUserRole()
    }, [])

    return(
        <div className="flex fixed space-x-5 p-6 w-full z-50 bg-black">
            <Link href={"/"} className={`hover:font-bold ${currentPath == '/' ? 'border-b' : ''}`}>Home</Link>
            <Link href={"/department"} className={`hover:font-bold ${currentPath == '/department' ? 'border-b' : ''}`}>Department</Link>
            <Link href={"/data-entry"} className={`hover:font-bold ${userRole == 'admin' ? '' : 'hidden'} ${currentPath.startsWith('/data-entry') ? 'border-b' : ''}`}>Data Entry</Link>
            <Link href={"/scan"} className={`hover:font-bold ${currentPath == '/scan' ? 'border-b' : ''}`}>Scan</Link>
            <Logout className={'justify-self-end hover:font-bold absolute right-10 text-xs'} />
        </div>
    )
}