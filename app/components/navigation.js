'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const currentPath = usePathname();
    return(
        <div className="flex fixed space-x-5 p-6 w-full">
            <Link href={"/"} className={`hover:font-bold ${currentPath == '/' ? 'border-b' : ''}`}>Home</Link>
            <Link href={"/department"} className={`hover:font-bold ${currentPath == '/department' ? 'border-b' : ''}`}>Department</Link>
        </div>
    )
}