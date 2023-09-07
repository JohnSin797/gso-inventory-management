'use client'

import { useEffect, useState } from "react"

export default function DateFrame ({ dateStr }) {
    const [newDate, setNewDate] = useState(new Date(dateStr))
    const [newMonth, setNewMonth] = useState('')

    const setMonth = (mon) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setNewMonth(monthNames[mon])
    }

    const setDate = () => {
        const d = new Date(dateStr)
        setNewDate(d)
        setMonth(d.getMonth())
    }

    useEffect(()=>{
        setDate()
    }, [dateStr])

    return (
        <>
            {
                newMonth + ' ' + newDate.getDate() + ', ' + newDate.getFullYear()
            }
        </>
    )
}