'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function EmployeeName ({ className, onChangeEmployee, onChangeDetails, defaultEmployee }) {
    const [employees, setEmployees] = useState([])

    const getEmployees = async () => {
        try {
            await axios.get('/api/employee')
            .then(res=>{
                setEmployees(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleEmployeeChange = (e) => {
        onChangeEmployee(e.target.value)
        onChangeDetails({
            
        })
    }

    useEffect(()=>{
        getEmployees()
    }, [])
    
    return <select className={className} onChange={(e)=>onChangeEmployee(e.target.value)} value={defaultEmployee}>
            <option>-- Select Employee --</option>
        {
            employees.map((item,id)=>{
                return (
                    <option key={id} value={item._id}>{item.first_name} {item.last_name}</option>
                )
            })
        }
    </select>
}