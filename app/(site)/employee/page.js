'use client'

import EmployeeName from "@/app/components/employeeName";
import Navigation from "@/app/components/navigation";
import axios from "axios";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { useState } from "react";

export default function Employee () {

    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState('')

    const getEmployees = async () => {
        try {
            await axios.post('/api/employee', {})
            .then(res=>{
                console.log(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

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
                <div className="flex w-full justify-center">
                    <EmployeeName className={'bg-black border-b'} onChangeEmployee={setSelectedEmployee} />
                </div>
                <table className="table-auto md:table-fixed w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((item,id)=>{
                                return(
                                    <tr key={id}>
                                        <td>{item}</td>
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