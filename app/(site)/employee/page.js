'use client'

import DateFrame from "@/app/components/dateFrame";
import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import EmployeeName from "@/app/components/select/employeeName";
import SelectMonth from "@/app/components/select/selectMonth";
import SelectYear from "@/app/components/select/selectYear";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Employee () {

    const [employees, setEmployees] = useState([])
    const [month, setMonth] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [totalCost, setTotalCost] = useState(0)
    const [employeeDetails, setEmployeeDetails] = useState({
        department: '',
        status: '',
        position: ''
    })

    const archiveRelease = async (id) => {
        try {
            await axios.post('/api/release/archive', {id:id})
            .then(res=>{
                Swal.fire(res.data.message)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const confirmDelete = id => {
        Swal.fire({
            title: 'Confirm delete',
            text: 'Are you sure you want to delete this released item?',
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true
        })
        .then(res=>{
            if (res.isConfirmed) {
                archiveRelease(id)
            }
        })
    }

    useEffect(()=>{
        const calculateTotalCost = (data) => {
            let totalCost = 0;
    
            data.forEach(item => {
                var itemCost = item?.quantity * item?.inventory?.unit_cost;
                totalCost += itemCost;
            });
    
            setTotalCost(totalCost)
        }

        const getEmployees = async () => {
            try {
                await axios.post('/api/employee/index', {id:selectedEmployee, month: month, year: year})
                .then(res=>{
                    console.log(res.data.data)
                    setEmployees(res.data.data)
                    calculateTotalCost(res.data.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getEmployees()
    }, [selectedEmployee, month, year])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 pb-1">
                <div className="w-full bg-white p-6 rounded-lg shadow-md">
                    <p className="text-center text-2xl font-bold font-serif">INDIVIDUAL</p>
                    <p className="text-center">( AS OF <SelectMonth onHandleChange={setMonth} /> <SelectYear onSetChange={setYear} /> )</p>
                    <div className="md:flex w-full justify-center mt-6">
                        <div>
                            <EmployeeName className={'border-black border-b'} onChangeDetails={setEmployeeDetails} onChangeEmployee={setSelectedEmployee} />
                            <p className="text-center text-gray-800 text-sm">NAME OF EMPLOYEE</p>
                        </div>
                    </div>
                    <div className="md:flex justify-between p-6">
                        <div className="flex flex-col w-full md:w-1/5">
                            <input 
                                className="border-black w-full border-b"
                                placeholder="Department"
                                defaultValue={employeeDetails.department}
                                readOnly
                            />
                            <label className="text-center text-xs">Department</label>
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <input 
                                className="border-black w-full border-b"
                                placeholder="Position"
                                defaultValue={employeeDetails.position}
                                readOnly
                            />
                            <label className="text-center text-xs">Position</label>
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <input 
                                className="border-black w-full border-b"
                                placeholder="Status of Employment"
                                defaultValue={employeeDetails.status}
                                readOnly
                            />
                            <label className="text-center text-xs">Status of Employment</label>
                        </div>
                        <div className="flex flex-col w-full md:w-1/5">
                            <input 
                                className="border-black w-full border-b"
                                placeholder="Total Cost"
                                defaultValue={totalCost.toLocaleString('en-US')}
                                readOnly
                            />
                            <label className="text-center text-xs">Total Cost</label>
                        </div>
                    </div>
                    <div className="w-full p-6 h-72 overflow-scroll">
                        <table className="table-auto w-full border border-slate-900">
                            <thead className="bg-slate-800 text-gray-600">
                                <tr>
                                    <th>Quantity</th>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Property Number</th>
                                    <th>Date Issued</th>
                                    <th>Cost</th>
                                    <th>ICS / ARE</th>
                                    <th>Returned</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map((item,id)=>{
                                        return(
                                            <tr key={id}>
                                                <td className="border border-slate-900">{item?.quantity}</td>
                                                <td className="border border-slate-900">{item?.item?.item_name}</td>
                                                <td className="border border-slate-900">{item?.item?.description?.map((desc,idx)=>{
                                                    return(
                                                        <p key={idx}>{desc}</p>
                                                    )
                                                })}</td>
                                                <td className="border border-slate-900">{item?.item?.property_number}</td>
                                                <td className="border border-slate-900"><DateFrame dateStr={item?.createdAt} /></td>
                                                <td className="border border-slate-900">{(item?.inventory.unit_cost * item?.quantity).toLocaleString('en-US')}</td>
                                                <td className="border border-slate-900">{item?.inventory?.ics_are}</td>
                                                <td className="border border-slate-900">{item?.returned}</td>
                                                <td className="border border-slate-900">{item?.remarks}</td>
                                                <td className="border border-slate-900">
                                                    <button
                                                        onClick={()=>confirmDelete(item._id)}
                                                        className="bg-red-600 hover:bg-red-600/80 p-2 w-full rounded-lg text-white"
                                                    >
                                                        archive
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}