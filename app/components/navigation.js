'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./logout";
import { useEffect, useState } from "react";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navigation({ onSetUserRole }) {
    const currentPath = usePathname();
    const [userRole, setUserRole] = useState('')
    const [isNavHidden, setIsNavHidden] = useState(false)

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
        <div className={`flex fixed justify-between p-6 w-full z-50 bg-black md:max-h-20 ${isNavHidden ? 'h-20 flex-row md:flex-col' : 'h-full flex-col md:flex-row'}`}>
            <p className="md:hidden">GSO Inventory Management</p>
            <div className={`flex flex-col md:flex-row md:space-x-5 ${isNavHidden ? 'hidden md:block' : 'space-y-5 md:space-y-0'}`}>
                <Link href={"/"} className={`hover:font-bold ${currentPath == '/' ? 'border-b' : ''}`}>Home</Link>
                <Link href={"/department"} className={`hover:font-bold ${currentPath == '/department' ? 'border-b' : ''}`}>Department</Link>
                <Link href={"/data-entry"} className={`hover:font-bold ${userRole == 'admin' ? '' : 'hidden'} ${currentPath.startsWith('/data-entry') ? 'border-b' : ''}`}>Data Entry</Link>
                <Link href={"/scan"} className={`hover:font-bold ${currentPath == '/scan' ? 'border-b' : ''}`}>Scan</Link>
                <Logout className={'text-left md:text-center md:absolute md:right-5 hover:font-bold md:text-xs'} />
            </div>
            <button
                className={`w-full flex justify-center ${isNavHidden ? 'hidden' : 'md:hidden'}`}
                onClick={()=>setIsNavHidden(!isNavHidden)}
            >
                <AiOutlineClose className="h-8 w-8 text-white" />
            </button>
            <button
                className={`${isNavHidden ? 'md:hidden' : 'hidden'}`}
                onClick={()=>setIsNavHidden(!isNavHidden)}
            >
                <GiHamburgerMenu className="h-8 w-8 text-white" />
            </button>
        </div>
    )
}