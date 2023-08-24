'use client'

import Navigation from "@/app/components/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DataEntryLayout({ children }) {

    const currentPath = usePathname()

    return (
      <div>
        <Navigation />
        <div className="p-5 absolute w-full mt-20">
            <div className="flex justify-between border space-x-2 p-10">
                <Link href={'/data-entry/department'} className={`block p-2 w-full text-center hover:bg-cyan-900 ${currentPath == '/data-entry/department' ? 'bg-slate-600' : 'bg-slate-900'}`}>Department</Link>
                <Link href={'/data-entry/employee'} className={`block p-2 w-full text-center hover:bg-cyan-900 ${currentPath == '/data-entry/employee' ? 'bg-slate-600' : 'bg-slate-900'}`}>Employee</Link>
                <Link href={'/data-entry/item'} className={`block p-2 w-full text-center hover:bg-cyan-900 ${currentPath == '/data-entry/item' ? 'bg-slate-600' : 'bg-slate-900'}`}>Item</Link>
            </div>
        </div>
        {children}
      </div>
    )
  }