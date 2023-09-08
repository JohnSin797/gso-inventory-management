'use client'

import { useState } from "react"
import Navigation from "../components/navigation"

export default function Home() {

    const [activeUsers, setActiveUsers] = useState([])

    return(
        <>
            <Navigation />
            <div className="pt-20 p-6 space-y-6">
                    <div className="border rounded">
                        <p className="block w-full border-b text-center">Statistics</p>
                        <div className="md:flex md:space-x-2 md:space-y-0 p-2 space-y-2">
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">Today</p>

                            </div>
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">This Week</p>
                                
                            </div>
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">This Month</p>
                                
                            </div>
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">This Year</p>
                                
                            </div>
                        </div>
                    </div> 
                <div className="border rounded">
                    <p className="block w-full border-b text-center">Active Users</p>
                    <div className="p-6 overflow-scroll">
                        <table className="table-auto md:table-fixed w-full ">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Last Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    activeUsers.map((item, id)=>{
                                        return(
                                            <tr key={id}>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}