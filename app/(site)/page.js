'use client'

import { useEffect, useState } from "react"
import Navigation from "../components/navigation"
import axios from "axios"
import Charts from "../components/charts"
import { data } from "autoprefixer"
import { elements } from "chart.js"

export default function Home() {

    const [activeUsers, setActiveUsers] = useState([])
    const [items, setItems] = useState([])
    const [costArray, setCostArray] = useState([])
    const [statistics, setStatistics] = useState({
        today: '',
        week: '',
        month: '',
        year: ''
    })

    const getDashboardData = async () => {
        try {
            await axios.get('/api/item')
            .then(res=>{
                setItems(res.data.data)
                calculateData(res.data.data)
                changeCostArray(res.data.data)
            })
            .catch(err=>{})
        } catch (error) {
            console.log(error.message)
        }
    }

    const changeCostArray = (items) => {
        let arr = []
        for (let index = 0; index < 12; index++) {
            let monthlyCost = 0
            items.map(element=>{
                if(new Date(element.createdAt).getMonth() == index) {
                    monthlyCost+=element.cost
                }
            })
            arr.push(monthlyCost)
        }
        setCostArray(arr)
    }

    const calculateData = (data) => {
        let todayTotal = 0
        let weekTotal = 0
        let monthTotal = 0
        let yearTotal = 0

        data.forEach(element => {
            const itemDateTemp = new Date(element['createdAt'])
            const temp = new Date()
            const itemDate = new Date(`${itemDateTemp.getMonth()}-${itemDateTemp.getDate()}-${itemDateTemp.getFullYear()}`)
            const todayDate = new Date(`${temp.getMonth()}-${temp.getDate()}-${temp.getFullYear()}`)
            if(itemDate.getTime() == todayDate.getTime()) {
                todayTotal+=element['cost']
            }
            if(itemDateTemp.getMonth() == temp.getMonth() && itemDateTemp.getFullYear() == temp.getFullYear()) {
                monthTotal+=element['cost']
            }
            if(itemDateTemp.getFullYear() == temp.getFullYear()) {
                yearTotal+=element['cost']
            }
            if(areDatesInSameWeek(temp, itemDateTemp)) {
                weekTotal+=element['cost']
            }
        });
        setStatistics({
            today: todayTotal,
            week: weekTotal,
            month: monthTotal,
            year: yearTotal
        })
    }

    const areDatesInSameWeek = (date1, date2) => {
        const sunday1 = new Date(date1);
        sunday1.setDate(date1.getDate() - date1.getDay());
        const sunday2 = new Date(date2);
        sunday2.setDate(date2.getDate() - date2.getDay());
      
        return sunday1.getTime() === sunday2.getTime();
    } 
    
    useEffect(()=>{
        getDashboardData()
    }, [])

    return(
        <>
            <Navigation />
            <div className="pt-20 p-6 space-y-6">
                    <div className="">
                        <div className="md:flex md:space-x-2 md:space-y-0 p-2 space-y-2">
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">Today</p>
                                <p className="text-center">Total: {statistics.today}</p>
                            </div>
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">This Week</p>
                                <p className="text-center">Total: {statistics.week}</p>
                            </div>
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">This Month</p>
                                <p className="text-center">Total: {statistics.month}</p>
                            </div>
                            <div className="rounded p-6 w-full md:max-w-xs bg-slate-900">
                                <p className="text-center">This Year</p>
                                <p className="text-center">Total: {statistics.year}</p>
                            </div>
                        </div>
                    </div> 
                <Charts className={`w-full p-6 md:px-20 h-96`} datasetArray={costArray} />
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