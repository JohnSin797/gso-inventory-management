'use client'

import EmployeeName from "@/app/components/employeeName";
import Navigation from "@/app/components/navigation";
import axios from "axios";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

export default function Employee () {

    const [employees, setEmployees] = useState([])
    const [employeeDetails, setEmployeeDetails] = useState({
        department: '',
        status: '',
        position: ''
    })
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [totalCost, setTotalCost] = useState('')

    const getEmployees = async () => {
        try {
            await axios.post('/api/employee/index', {id:selectedEmployee})
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

    const calculateTotalCost = (data) => {
        let totalCost = 0;

        data.forEach(item => {
            totalCost += parseInt(item['cost']);
        });

        setTotalCost(totalCost)
    }

    useEffect(()=>{
        getEmployees()
    }, [selectedEmployee])

    const generate = () => {
        const doc = new Document({
            sections: [
                {
                children: [
                    new Paragraph({
                        text: "butt",
                        bullet: {
                            level: 0 //How deep you want the bullet to be
                        }
                    }),
                    new Paragraph({
                        text: "testing",
                    }),
                    new Paragraph({
                        
                    }),
                    new Paragraph({
                        text: "testing",
                    })
                ]
                }
            ]
        });
    
        Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            saveAs(blob, "Employee.docx");
            console.log("Document created successfully");
        });
    }

    return (
        <div>
            <Navigation />
            <div className="pt-20 p-6">
                Employee
                <button 
                    className="p-1"
                    onClick={generate}
                >
                    export
                </button>
                <div className="md:flex w-full justify-center">
                    <EmployeeName className={'bg-black border-b'} onChangeDetails={setEmployeeDetails} onChangeEmployee={setSelectedEmployee} />
                </div>
                <div className="md:flex justify-between p-6">
                    <div className="flex flex-col w-full md:w-1/5">
                        <input 
                            className="bg-black w-full border-b"
                            placeholder="Department"
                            value={employeeDetails.department}
                        />
                        <label className="text-center text-xs">Department</label>
                    </div>
                    <div className="flex flex-col w-full md:w-1/5">
                        <input 
                            className="bg-black w-full border-b"
                            placeholder="Position"
                            value={employeeDetails.position}
                        />
                        <label className="text-center text-xs">Position</label>
                    </div>
                    <div className="flex flex-col w-full md:w-1/5">
                        <input 
                            className="bg-black w-full border-b"
                            placeholder="Status of Employment"
                            value={employeeDetails.status}
                        />
                        <label className="text-center text-xs">Status of Employment</label>
                    </div>
                    <div className="flex flex-col w-full md:w-1/5">
                        <input 
                            className="bg-black w-full border-b"
                            placeholder="Total Cost"
                            value={totalCost}
                        />
                        <label className="text-center text-xs">Total Cost</label>
                    </div>
                </div>
                <table className="table-auto md:table-fixed w-full">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Property Number</th>
                            <th>Date Issued</th>
                            <th>Cost</th>
                            <th>Returned</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((item,id)=>{
                                return(
                                    <tr key={id}>
                                        <td>{item?.quantity}</td>
                                        <td>{item?.item_name}</td>
                                        <td>{item?.description}</td>
                                        <td>{item?.property_number}</td>
                                        <td>{item?.createdAt}</td>
                                        <td>{item?.cost}</td>
                                        <td>{item?.returned}</td>
                                        <td>{item?.remarks}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}