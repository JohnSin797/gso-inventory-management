'use client'

import SideNav from "@/app/components/navigation/sideNav"
import TopNav from "@/app/components/navigation/topNav"
import { useState } from "react"

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

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-6">
                    
                </div>
            </div>
        </div>
    )
}