'use client';

import Navigation from "@/app/components/navigation";
import { useState } from "react";

export default function User () {

    const [users, setUsers] = useState([])

    const getUserData = async () => {
        try {

        } catch (error) {
            
        }
    }

    return (
        <div>
            <Navigation />
            <div className="p-6 pt-20">
                User
                <div className="w-full h-96 overflow-scroll">
                    <table className="w-full table-auto md:table-fixed border">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item,id)=>{
                                    return (
                                        <tr key={id}>
                                            <td>{item?.first_name} {item?.last_name}</td>
                                            <td>{item?.username}</td>
                                            <td>{item?.password}</td>
                                            <td className="flex space-x-2">
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