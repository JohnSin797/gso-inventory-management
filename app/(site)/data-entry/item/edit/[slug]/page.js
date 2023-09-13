'use client'

import EmployeeName from "@/app/components/employeeName"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Edit ({ params }) {

    const [item, setItem] = useState({
        item_name: '',
        barcode_text: '',
        property_number: '',
        description: '',
        quantity: '',
        cost: (0).toFixed(2),
        remarks: '',
        status: 'working',
        returned: false
    })
    const [employeeId, setEmployeeId] = useState('')

    const handleEditChange = (e) => {
        const {name, value} = e.target
        setItem({
            ...item,
            [name]: value
        })
    }

    const getItemData = async () => {
        try {
            await axios.post('/api/item', {id: params.slug})
            .then(res=>{
                console.log(res)
                setItem(res.data.data)
                setEmployeeId(res.data.data.employee._id)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const saveEdit = async () => {
        try {
            await axios.post('/api/item/update', {
                employeeId: employeeId,
                item_id: params.slug,
                item_name: item.item_name,
                barcode_text: item.barcode_text,
                property_number: item.property_number,
                description: item.description,
                quantity: item.quantity,
                cost: item.cost,
                remarks: item.remarks,
                status: item.status,
                returned: item.returned
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

    useEffect(()=>{
        getItemData()
    },[])

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-4/5 border rounded p-6 space-y-2">
                <div className="md:flex md:space-x-2">
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Item Name</label>
                        <input 
                            type="text"
                            className="w-full bg-black"
                            placeholder="Item Name"
                            name="item_name"
                            onChange={handleEditChange}
                            value={item.item_name}
                            required
                        />
                    </div>
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Property Number</label>
                        <input 
                            type="text"
                            className="w-full bg-black"
                            placeholder="Property Number"
                            name="item_name"
                            onChange={handleEditChange}
                            value={item.property_number}
                            required
                        />
                    </div>
                </div>
                <div className="w-full border-b">
                    <label className="text-xs font-bold">Item Description</label>
                    <input 
                        type="text"
                        className="w-full bg-black"
                        placeholder="Item Description"
                        name="description"
                        onChange={handleEditChange}
                        value={item.description}
                        required
                    />
                </div>
                <div className="md:flex md:space-x-2">
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Item Barcode</label>
                        <input 
                            type="text"
                            className="w-full bg-black"
                            placeholder="Item Code"
                            name="barcode_text"
                            onChange={handleEditChange}
                            value={item.barcode_text}
                            required
                        />
                    </div>
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Employee Name</label>
                        <EmployeeName 
                            className={'bg-black w-full'} 
                            onChangeEmployee={setEmployeeId} 
                            defaultEmployee={employeeId}
                        />
                    </div>
                </div>
                
                <div className="md:flex md:space-x-2">
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Quantity</label>
                        <input 
                            type="text"
                            className="w-full bg-black"
                            placeholder="Quantity"
                            name="quantity"
                            onChange={handleEditChange}
                            value={item.quantity}
                            required
                        />
                    </div>
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Cost</label>
                        <input 
                            type="number"
                            className="w-full bg-black"
                            placeholder="Cost"
                            name="cost"
                            onChange={(e)=>setForm({
                                ...item,
                                cost: e.target.value
                            })}
                            value={item.cost}
                            required
                        />
                    </div>
                    <div className="w-full border-b">
                        <label className="text-xs font-bold">Status</label>
                        <input 
                            type="text"
                            className="w-full bg-black"
                            placeholder="Status"
                            name="status"
                            onChange={handleEditChange}
                            value={item.status}
                            required
                        />
                    </div>
                    <div className="w-full bg-black border-b">
                        <p><label htmlFor="isReturned" className="text-xs font-bold">Returned?</label></p>
                        <input 
                            type="checkbox"
                            name="returned"
                            id="isReturned"
                            checked={item.returned}
                            onChange={()=>setItem({
                                ...item,
                                returned: !item.returned
                            })}
                        />
                    </div>
                </div>
                <textarea 
                    type="text"
                    className="w-full bg-black border rounded resize-none"
                    placeholder="Remarks (optional)"
                    name="remarks"
                    onChange={handleEditChange}
                    value={item.remarks}
                />
                <div className="md:flex md:space-x-2">
                    <Link href={'/data-entry/item'} className="block w-full md:w-1/3 p-1 text-center border">back</Link>
                    <button 
                        className="w-full md:w-1/3 p-1 border"
                        onClick={saveEdit}
                    >
                        update
                    </button>
                </div>
            </div>
        </div>
    )
}