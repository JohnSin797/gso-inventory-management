'use client'

import Navigation from "@/app/components/navigation"
import SelectYear from "@/app/components/selectYear"
import DepartmentSelect from "@/app/components/departmentSelect"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import DateFrame from "@/app/components/dateFrame"

export default function Department() {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [department, setDepartment] = useState('')
    const [total, setTotal] = useState('')
    const [tableData, setTableData] = useState([])

    const setTotalCost = (data) => {
        let totalCost = 0;

        data.forEach(item => {
            totalCost += parseInt(item['cost']);
        });

        setTotal(totalCost)
    }

    const getData = async () => {
        try {
            console.log(department)
            await axios.post('/api/department', {month: month, year: year, department: department})
            .then(res=>{
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

    useEffect(()=>{
        getData()
    }, [month, year, department])

    return (
        <div>
            <Navigation />
            <div className="pt-20 font-serif">
                <p className="text-2xl text-center">REPORT ON THE PHYSICAL COUNT OF INVENTORIES</p>
                <p className="text-center">( PER DEPARTMENT )</p>
                <div className="w-full flex justify-center p-6">
                    <DepartmentSelect 
                        className="w-full md:w-1/5 bg-black placeholder:text-center border-b text-white"
                        onHandleChange={setDepartment}
                    />
                </div>
                <div className="flex justify-between p-6">
                    <div>
                        <select 
                            className="bg-black text-center text-xs border-b border-white"
                            onChange={(e)=>setMonth(e.target.value)}
                        >
                            <option>-- Select Month --</option>
                            <option value={'01'}>January</option>
                            <option value={'02'}>February</option>
                            <option value={'03'}>March</option>
                            <option value={'04'}>April</option>
                            <option value={'05'}>May</option>
                            <option value={'06'}>June</option>
                            <option value={'07'}>July</option>
                            <option value={'08'}>August</option>
                            <option value={'09'}>September</option>
                            <option value={'10'}>October</option>
                            <option value={'11'}>November</option>
                            <option value={'12'}>December</option>
                        </select>
                        <SelectYear className="bg-black text-center text-xs border-b border-white" onSetChange={setYear} />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="bg-black text-center text-xs border-b border-white"
                            defaultValue={total}
                        />
                        <p className="text-center text-xs">TOTAL</p>
                    </div>
                </div>
                <div className="p-6 overflow-scroll">
                    <table className="table-auto md:table-fixed w-full">
                        <thead>
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
                                            <td className="">{item.department?.department_name}</td>
                                            <td className="">{item.quantity}</td>
                                            <td className="">{item.item_name}</td>
                                            <td className="">{item.barcode_text}</td>
                                            <td className="">{item.employee?.first_name} {item.employee?.last_name}</td>
                                            <td className="">
                                                <DateFrame dateStr={item.createdAt} />
                                            </td>
                                            <td className="">{item.cost}</td>
                                            <td className="">{item.returned}</td>
                                            <td className="">{item.remarks}</td>
                                            <td className="space-x-2 flex">
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
    )
}