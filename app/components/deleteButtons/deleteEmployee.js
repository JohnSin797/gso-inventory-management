'use client'

import axios from "axios"
import Swal from "sweetalert2"

export default function DeleteEmployee ({ onSetEmployees, employeeId, onSetItems }) {
    const handeDelete = async (id) => {
        try {
            await axios.post('/api/employee/delete', {id:id})
            .then(res=>{
                onSetEmployees(res.data.employee)
                onSetItems(res.data.item)
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err.message)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <button
            className="w-full md:w-1/2 p-1 bg-red-400 hover:bg-red-900"
            type="button"
            onClick={()=>handeDelete(employeeId)}
        >
            delete
        </button>
    )
}