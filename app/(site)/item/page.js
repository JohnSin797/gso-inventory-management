'use client';

import Navigation from "@/app/components/navigation";
import { useState } from "react";

export default function Item () {

    const [items, setItems] = useState([])

    return (
        <div>
            <Navigation />
            <div className="p-6 pt-20">
                <div className="h-96 w-full overflow-scroll">
                    <table className="w-full table-auto md:table-fixed border">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Office</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item,id)=>{
                                    return (
                                        <tr key={id}>
                                            <td>{item?.first_name} {item?.last_name}</td>
                                            <td>{item?.department?.department_name}</td>
                                            <td>{item?.office}</td>
                                            <td>
                                                <button
                                                    className="w-1/2 p-1 bg-green-400"
                                                >
                                                    edit
                                                </button>
                                                <button
                                                    className="w-1/2 p-1 bg-red-400"
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