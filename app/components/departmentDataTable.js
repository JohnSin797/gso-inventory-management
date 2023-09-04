'use client';

import { useEffect, useState } from "react";
import axios from "axios";

export default function DepartmentDataTable () {
    const [department, setDepartment] = useState([])

    const getDepartment = async () => {
        try {
            await axios.get('/api/department')
            .then(res=>{
                console.log(res)
                setDepartment(res.data.data)
            })
            .catch(err=>{})
        } catch (error) {

        }
    }

    useEffect(()=>{
        getDepartment()
    },[])

    return (
        <div>
            {
                        department.map((item,id)=>{
                            return(
                                <div className="flex justify-between" key={id}>
                                    <p className="text-center hover:font-bold">{item}</p>
                                    <button
                                        className="w-1/5 p-1 rounded border"
                                    >
                                        edit
                                    </button>
                                    <button
                                        className="w-1/5 p-1 rounded border"
                                    >
                                        delete
                                    </button>
                                </div>
                            )
                        })
                    }
        </div>
    )
}