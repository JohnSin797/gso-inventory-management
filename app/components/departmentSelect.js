'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function DepartmentSelect ({className, onHandleChange}) {

    const [department, setDepartment] = useState([])

    const setDepartmentOptions = async () => {
        try {
            await axios.get('/api/department/data-entry')
            .then(res=>{
                setDepartment(res.data.data)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        setDepartmentOptions()
    }, [])

    return(
        <select className={className} onChange={(e)=>onHandleChange(e.target.value)}>
            <option>Departments</option>
            {
                department.map((item,id)=>{
                    return(
                        <option key={id} value={item.department_name}>{item.department_name}</option>
                    )
                })
            }
        </select>
    )
}