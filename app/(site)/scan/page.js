'use client'

import Navigation from "@/app/components/navigation"
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

export default function Scan () {
    const [scanResult, setScanResult] = useState(null);
    const [form, setForm] = useState({
        item_name: '',
        barcode_text: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const saveItem = async () => {
        try {
            await axios.post('/api/item/create', form)
            .then(res=>{
                Swal.fire(res.data.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const getItem = async (code) => {
        try {
            await axios.post('/api/item/create', {barcode_text: code})
            .then(res=>{
                setForm(res.data.data)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        });
      
        scanner.render(success, error);
      
        function success(result) 
        {
          scanner.clear();
          setScanResult(result);
          setForm({
            ...form,
            barcode_text: result
          })
          getItem(result);
        }
      
        function error(err)
        {
          console.log(err);
        }
      }, []);

    return (
        <div>
            <Navigation />
            <div className="pt-20 px-10 w-full md:flex">
                <div className="h-76 sm:w-full md:w-96 p-6">
                    {
                        scanResult ? <p>Scan success! {scanResult}</p>
                        :  
                        <div id='reader'></div>
                    }
                </div>
                <div className="w-full border rounded p-6 space-y-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Item Name" 
                        name="item_name"
                        onChange={handleChange}
                        value={form.item_name}
                    />
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Item Code" 
                        value={form.barcode_text}
                        name="barcode_text"
                        onChange={handleChange}
                    />
                    <button 
                        className="border p-1 rounded w-1/6 hover:bg-cyan-900"
                        onClick={saveItem}
                    >
                        save
                    </button>
                </div>
            </div>
        </div>
    )
}