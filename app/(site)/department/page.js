'use client'

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import DepartmentSelect from "@/app/components/select/departmentSelect";
import SelectMonth from "@/app/components/select/selectMonth";
import SelectYear from "@/app/components/select/selectYear";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import DateFrame from "@/app/components/dateFrame";

export default function Department () {

    const [department, setDepartment] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [total, setTotal] = useState('')
    const [tableData, setTableData] = useState([])

    

    useEffect(()=>{
        const setTotalCost = (data) => {
            let totalCost = 0;
    
            data.forEach(item => {
                totalCost += parseInt(item['cost']);
            });
    
            setTotal(totalCost)
        }

        const getData = async () => {
            try {
                await axios.post('/api/department', {month: month, year: year, department: department})
                .then(res=>{
                    console.log(res)
                    setTableData(res.data.data)
                    setTotalCost(res.data.data)
                })
                .catch(err=>{
                    setTableData([])
                    Swal.fire(err.response.data.message)
                })
            } catch (error) {
                console.log(error.message)
                setTableData([])
            }
        }
        getData()
    }, [month, year, department])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 pb-5">
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <p className="text-2xl text-center font-bold font-serif">REPORT ON THE PHYSICAL COUNT OF INVENTORIES</p>                    
                    <p className="text-center">( PER DEPARTMENT )</p>
                    
                    <div className="w-full flex justify-center p-6">
                        <DepartmentSelect 
                            className="w-full md:w-1/5 placeholder:text-center border-b border-black px-2"
                            onHandleChange={setDepartment}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <SelectMonth className={'text-center text-xs border-b border-black'} onHandleChange={setMonth} />
                            <SelectYear className={'text-center text-xs border-b border-black'} onSetChange={setYear} />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="text-center text-xs border-b border-black"
                                defaultValue={total}
                            />
                            <p className="text-center text-xs">TOTAL</p>
                        </div>
                    </div>
                    <div className="p-6 overflow-scroll h-80">
                        <table className="table-auto w-full border border-slate-900">
                            <thead className="bg-slate-800 text-gray-400">
                                <tr>
                                    <th>Office</th>
                                    <th>Quantity</th>
                                    <th>Item</th>
                                    <th>Property No.</th>
                                    <th>Name of EMPLOYEE</th>
                                    <th>Date Issued</th>
                                    <th>Cost</th>
                                    <th>Returned</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData.map((item,id)=>{
                                        return(
                                            <tr key={id}>
                                                <td className=" border border-slate-900">{item.department?.department_name}</td>
                                                <td className=" border border-slate-900">{item.quantity}</td>
                                                <td className=" border border-slate-900">{item.item_name}</td>
                                                <td className=" border border-slate-900">{item.barcode_text}</td>
                                                <td className=" border border-slate-900">{item.employee?.first_name} {item.employee?.last_name}</td>
                                                <td className=" border border-slate-900">
                                                    <DateFrame dateStr={item.createdAt} />
                                                </td>
                                                <td className=" border border-slate-900">{item.cost}</td>
                                                <td className=" border border-slate-900">{item.returned}</td>
                                                <td className=" border border-slate-900">{item.remarks}</td>
                                                <td className="space-x-2 flex border border-slate-900">
                                                    <button
                                                        className="w-1/2 hover:font-bold hover:bg-cyan-600"
                                                    >
                                                        edit
                                                    </button>
                                                    <button
                                                        className="w-1/2 hover:font-bold hover:bg-red-600"
                                                    >
                                                        delete
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