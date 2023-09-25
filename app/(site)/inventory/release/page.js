'use client'

import EmployeeSelect from "@/app/components/employeeSelect";
import ItemSelect from "@/app/components/itemSelect";
import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import Link from "next/link";
import { useState } from "react";

export default function Release () {

    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [selectedItem, setSelectedItem] = useState('')

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 flex justify-center items-center">
                <div className="w-full md:w-3/5 p-6 bg-white rounded-lg shadow-md">
                    <form className="w-full">
                        <p className="text-2xl text-center font-bold">Borrow Item</p>
                        <div className="w-full">
                            <label className="text-xs font-bold">Employee</label>
                            <EmployeeSelect className={'w-full p-2 border hover:border-black rounded-lg'} employees={[]} onEmployeeChange={setSelectedEmployee} />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">Item</label>
                            <ItemSelect className={'w-full p-2 border hover:border-black rounded-lg'} items={[]} onItemChange={setSelectedItem} />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">Date Borrowed</label>
                            <input 
                                type="date"
                                className="w-full p-2 rounded-lg border hover:border-black"
                            />
                        </div>
                        <div className="w-full py-6 flex gap-2">
                            <Link
                                href={'/inventory'}
                                className="block p-2 w-full md:w-1/2 rounded-lg bg-slate-800 hover:bg-slate-800/80 text-center text-white"
                            >
                                back
                            </Link>
                            <button
                                type="submit"
                                className="w-full md:w-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-600/80 text-white"
                            >
                                save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}