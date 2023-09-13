'use client'

import EmployeeName from "@/app/components/employeeName"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Item () {

    const [form, setForm] = useState({
        item_name: '',
        barcode_text: '',
        property_number: '',
        description: '',
        quantity: '',
        cost: (0).toFixed(2),
        remarks: '',
        employee: ''
    })
    const [employeeId, setEmployeeId] = useState('')
    const [errors, setErrors] = useState([])
    const [item, setItem] = useState([])
    const [itemAlreadyExist, setItemAlreadyExist] = useState(false)

    const onFormChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const getEmployeeId = () => {
        setForm({
            ...form,
            employee: employeeId
        })
    }

    useEffect(()=>{
        setTimeout(getEmployeeId, 1000)
    }, [employeeId])

    const saveItem = async () => {
        try {
            setItem([])
            setItemAlreadyExist(false)
            await axios.post('/api/item/create', form)
                .then(res=>{
                    console.log(res.data.message)
                    setForm({
                        item_name: '',
                        barcode_text: '',
                        property_number: '',
                        description: '',
                        quantity: '',
                        cost: (0).toFixed(2),
                        remarks: '',
                        employee: ''
                    })
                    Swal.fire(res.data.message)
                })
                .catch(err=>{
                    Swal.fire(err.response.data.message)
                    setItem(err.response.data.data)
                    setItemAlreadyExist(true)
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="absolute top-60 p-6 md:flex md:justify-center md:items-center md:space-x-2 w-full">
            <div className={`${itemAlreadyExist ? 'w-full md:w-1/5 border rounded p-6 mb-2' : 'hidden'}`}>
                <p className="text-center text-xl">Existing Item</p>
                <p>Item Name: {item?.item_name}</p>
                <p>Item Code: {item?.barcode_text}</p>
                <p>Quantity: {item?.quantity}</p>
                <p>Cost: {item?.cost}</p>
                <p>Employee: {item?.employee?.first_name} {item?.employee?.last_name}</p>
                <p>Department: {item?.department?.department_name}</p>
                <p>Remarks:{item?.remarks}</p>
            </div>
            <div className="w-full md:w-3/5 border rounded p-6 md:px-20 space-y-4">
                <div className="md:flex md:space-x-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Item Name"
                        name="item_name"
                        onChange={onFormChange}
                        value={form.item_name}
                        required
                    />
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Property Number"
                        name="property_number"
                        onChange={onFormChange}
                        value={form.property_number}
                        required
                    />
                </div>
                <input 
                    type="text"
                    className="w-full bg-black border-b"
                    placeholder="Item Code"
                    name="barcode_text"
                    onChange={onFormChange}
                    value={form.barcode_text}
                    required
                />
                <input 
                    type="text"
                    className="w-full bg-black border-b"
                    placeholder="Item Description"
                    name="description"
                    onChange={onFormChange}
                    value={form.description}
                    required
                />
                <div className="md:flex md:space-x-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={onFormChange}
                        value={form.quantity}
                        required
                    />
                    <input 
                        type="number"
                        className="w-full bg-black border-b"
                        placeholder="Cost"
                        name="cost"
                        onChange={(e)=>setForm({
                            ...form,
                            cost: e.target.value
                        })}
                        value={form.cost}
                        required
                    />
                </div>
                <EmployeeName 
                    className={'w-full bg-black border-b'} 
                    onChangeEmployee={setEmployeeId} 
                />
                <textarea 
                    type="text"
                    className="w-full bg-black border rounded resize-none"
                    placeholder="Remarks (optional)"
                    name="remarks"
                    onChange={onFormChange}
                    value={form.remarks}
                />
                <div className="flex space-x-2">
                    <button
                        className="p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded"
                        onClick={saveItem}
                    >
                        save
                    </button>
                    <Link href={'/scan'} className="block p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded text-center">scan</Link>
                    <Link href={'/data-entry/item'} className="block p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded text-center">back</Link>
                </div>
            </div>
        </div>
    )
}