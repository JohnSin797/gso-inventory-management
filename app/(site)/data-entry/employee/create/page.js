'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Create () {
    const router = useRouter()
    const [department, setDepartment] = useState([])

    const getDepartmentArray = async () => {
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
        getDepartmentArray()
    },[])

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        position: '',
        employment_status: '',
        dep: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const createEmployee = async (e) => {
        try {
            e.preventDefault()
            await axios.post('/api/employee', formData)
            .then(res=>{
                // router.push('/data-entry/employee')
                setFormData({
                    first_name: '',
                    last_name: '',
                    position: '',
                    employment_status: '',
                    dep: '',
                })
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <div className="absolute top-60 w-full">
            <div className="flex justify-center items-center md:pt-10 px-5">
                <form onSubmit={createEmployee} className="md:w-2/5 border rounded p-6 space-y-2">
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="text"
                        className="bg-black border-b w-full"
                        placeholder="Employment Status"
                        name="employment_status"
                        value={formData.employment_status}
                        onChange={handleChange}
                        required
                    />
                    <select 
                        className="bg-black border-b w-full"
                        name="dep"
                        value={formData.dep}
                        onChange={handleChange}
                    >
                        <option>-- Select Department --</option>
                        {
                            department.map((item,id)=>{
                                return(
                                    <option key={id} value={item._id}>{item.department_name} {item.office_name}</option>
                                )
                            })
                        }
                    </select>
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="p-1 w-1/2 border rounded hover:bg-cyan-900"
                        >
                            save
                        </button>
                        <Link href={'/data-entry/employee'} className="block text-center p-1 w-1/2 border rounded hover:bg-cyan-900">back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}