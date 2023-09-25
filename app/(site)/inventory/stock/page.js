'use client';

import EmployeeSelect from "@/app/components/employeeSelect";
import ItemSelect from "@/app/components/itemSelect";
import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Stock () {

    const [items, setItems] = useState([])
    const [selectedItem, setSelectedItem] = useState('')
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [tag, setTag] = useState('')
    const [qty, setQty] = useState('')
    const [cost, setCost] = useState('')
    const [remark, setRemark] = useState('')

    const addStock = async () => {
        try {
            await axios.post('/api/inventory/store', {
                inventory_tag: tag,
                quantity: qty,
                cost: cost,
                item_id: selectedItem,
                employee_id: selectedEmployee,
                remarks: remark
            })
            .then(res=>{
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const getDatas = async () => {
        try {
            await axios.get('/api/inventory')
            .then(res=>{
                setItems(res.data.items)
                setEmployees(res.data.employees)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getDatas()
    }, [items, employees])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg p-6 shadow-md flex gap-2">
                    <Link
                        href={'/inventory'}
                        className="block w-1/3 p-2 rounded-lg bg-slate-800 hover:bg-slate-800/80 text-center text-white"
                    >
                        back
                    </Link>
                    <button
                        className="w-1/3 p-2 rounded-lg bg-blue-600 hover:bg-blue-600/80 text-white"
                        onClick={addStock}
                    >
                        add stock
                    </button>
                </div>
                <div className="w-full bg-white rounded-lg p-6 shadow-md space-y-2">
                    <div className="w-full flex gap-2">
                        <div className="w-1/2">
                            <label className="text-xs font-bold">Inventory Tag</label>
                            <input 
                                type="text"
                                className="w-full p-2 border hover:border-black rounded-lg"
                                onChange={(e)=>setTag(e.target.value)}
                                value={tag}
                                required
                            />
                        </div>
                        <div className="w-1/4">
                            <label className="text-xs font-bold">Quantity</label>
                            <input 
                                type="text"
                                className="w-full p-2 border hover:border-black rounded-lg"
                                onChange={(e)=>setQty(e.target.value)}
                                value={qty}
                                required
                            />
                        </div>
                        <div className="w-1/4">
                            <label className="text-xs font-bold">Cost</label>
                            <input 
                                type="text"
                                className="w-full p-2 border hover:border-black rounded-lg"
                                onChange={(e)=>setCost(e.target.value)}
                                value={cost}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full flex gap-2">
                        <div className="w-1/2">
                            <label className="text-xs font-bold">Item</label>
                            <ItemSelect className={`w-full p-2 border hover:border-black rounded-lg`} items={items} onItemChange={setSelectedItem} required/>
                        </div>
                        <div className="w-1/2">
                            <label className="text-xs font-bold">Employee</label>
                            <EmployeeSelect className={`w-full p-2 border hover:border-black rounded-lg`} employees={employees} onEmployeeChange={setSelectedEmployee} required/>
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="text-xs font-bold">Remarks</label>
                        <textarea 
                            className="resize-none p-2 w-full rounded-lg border hover:border-black"
                            placeholder="Type here..."
                            onChange={(e)=>setRemark(e.target.value)}
                            value={remark}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}