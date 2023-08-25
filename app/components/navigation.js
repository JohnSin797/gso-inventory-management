'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./logout";

export default function Navigation() {
    const currentPath = usePathname();
    return(
        <div className="flex fixed space-x-5 p-6 w-full z-50 bg-black">
            <Link href={"/"} className={`hover:font-bold ${currentPath == '/' ? 'border-b' : ''}`}>Home</Link>
            <Link href={"/department"} className={`hover:font-bold ${currentPath == '/department' ? 'border-b' : ''}`}>Department</Link>
            <Link href={"/data-entry"} className={`hover:font-bold ${currentPath.startsWith('/data-entry') ? 'border-b' : ''}`}>Data Entry</Link>
            <Link href={"/scan"} className={`hover:font-bold ${currentPath == '/scan' ? 'border-b' : ''}`}>Scan</Link>
            <Logout className={'justify-self-end hover:font-bold absolute right-10 text-xs'} />
        </div>
    )
}