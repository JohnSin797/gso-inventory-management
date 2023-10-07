'use client'

import SideNav from "@/app/components/navigation/sideNav"
import TopNav from "@/app/components/navigation/topNav"
import { useBarcode } from "next-barcode"
import { useState } from "react"

export default function GenerateBarcode () {
    const [barcode, setBarcode] = useState('sample')
    const [inputVal, setInputVal] = useState('')

    const GenerateBarcodeImage = () => {
        const {inputRef} = useBarcode({
            value: barcode
        })

        return <img ref={inputRef} />
    }

    const handleBarcodeChange = e => {
        e.preventDefault()
        setInputVal(e.target.value)
        if(!e.target.value) {
            setBarcode('sample')
        }
        else {
            setBarcode(e.target.value)   
        }
    }


    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <div className="w-full rounded-lg bg-white shadow-md flex justify-center">
                    <div className="w-full md:w-1/3">
                        <GenerateBarcode />
                        <input
                            type="text"
                            className="w-full p-2 rounded-lg border"
                            onChange={handleBarcodeChange}
                            value={inputVal}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}