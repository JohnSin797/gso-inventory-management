'use client'

import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import Swal from "sweetalert2"

export default function Item () {

    const [form, setForm] = useState({
        item_name: '',
        item_code: '',
        quantity: '',
        cost: ''
    })
    const [errors, setErrors] = useState([])

    const onFormChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const validateForm = () => {
        const errors = []

        if(!form.item_name.trim()) {
            errors.item_name = 'Item name is required'
        }

        if(!form.item_code.trim()) {
            errors.item_code = 'Item code is required'
        }

        if(!form.quantity.trim()) {
            errors.quantity = 'Quantity is required'
        }

        if(!form.cost.trim()) {
            errors.cost = 'Cost is required'
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const saveItem = async () => {
        try {
            const isFormValid = validateForm()
            if(isFormValid) {
                await axios.post('/api/item/create', form)
                .then(res=>{
                    console.log(res.data.message)
                    setForm({
                        item_name: '',
                        item_code: '',
                        quantity: '',
                        cost: ''
                    })
                    Swal.fire(res.data.message)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="absolute top-60 p-6 flex justify-center items-center w-full">
            <div className="w-full md:w-3/5 border rounded p-6 md:px-20 space-y-2">
                <input 
                    type="text"
                    className="w-full bg-black border-b"
                    placeholder="Item Name"
                    name="item_name"
                    onChange={onFormChange}
                    value={form.item_name}
                />
                <p className="block h-3 text-red-600 text-center text-xs">{errors.item_name}</p>
                <input 
                    type="text"
                    className="w-full bg-black border-b"
                    placeholder="Item Code"
                    name="item_code"
                    onChange={onFormChange}
                    value={form.item_code}
                />
                <p className="block h-3 text-red-600 text-center text-xs">{errors.item_code}</p>
                <input 
                    type="text"
                    className="w-full bg-black border-b"
                    placeholder="Quantity"
                    name="quantity"
                    onChange={onFormChange}
                    value={form.quantity}
                />
                <p className="block h-3 text-red-600 text-center text-xs">{errors.quantity}</p>
                <input 
                    type="text"
                    className="w-full bg-black border-b"
                    placeholder="Cost"
                    name="cost"
                    onChange={onFormChange}
                    value={form.cost}
                />
                <p className="block h-3 text-red-600 text-center text-xs">{errors.cost}</p>
                <div className="flex space-x-2">
                    <button
                        className="p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded"
                        onClick={saveItem}
                    >
                        save
                    </button>
                    <Link href={'/scan'} className="block p-1 w-1/3 bg-slate-600 hover:bg-cyan-900 rounded text-center">scan</Link>
                </div>
            </div>
        </div>
    )
}