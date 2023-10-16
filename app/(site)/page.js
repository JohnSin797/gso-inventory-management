'use client'

import SideNav from "../components/navigation/sideNav"
import TopNav from "../components/navigation/topNav"
import CardDataSet from "../components/dashboard/cardDataSet"
import { IoTodayOutline } from "react-icons/io5"
import ChartCard from "../components/dashboard/chartCard"
import BorrowedItemChart from "../components/dashboard/borrowedItemChart"
import { useEffect, useState } from "react"
import axios from "axios"
import { TodayDate, getWeeklyRelease, getWeeklyStocks, isDateThisMonth } from "../hooks/todayDate"

export default function Page () {

    const [inventoryDetails, setInventoryDetails] = useState({
        today: 0,
        today_percent: 0,
        week: 0,
        week_percent: 0,
        month: 0,
        month_percent: 0,
        year: 0,
        year_percent: 0,
        weekly_cost: [],
        weekly_release: []
    })

    const processWeek = (arr, totalStock) => {
        const week_cost = getWeeklyStocks(arr)
        const week_release = getWeeklyRelease(arr)
        let today = 0
        let week = 0
        let month = 0
        let year = 0
        const currentDate = new Date()
        let startDate = new Date(currentDate)
        let endDate = new Date(currentDate)
        startDate.setDate(currentDate.getDate() - currentDate.getDay())
        endDate.setDate(currentDate.getDate() + (6 - currentDate.getDay()))
        arr.map(element => {
            if(TodayDate(element?.createdAt)) {
                today += element?.total_cost
            }
            if(new Date(element?.createdAt) >= startDate && new Date(element?.createdAt) <= endDate) {
                week += element.total_cost
            }
            if(isDateThisMonth(element?.createdAt)) {
                month += element?.total_cost
            }
            if(new Date(element?.createdAt).getFullYear() == new Date().getFullYear()) {
                year += element?.total_cost
            }
        })
        const today_percent = (today/totalStock) * 100
        const week_percent = (week/totalStock) * 100
        const month_percent = (month/totalStock) * 100
        const year_percent = (year/totalStock) * 100
        setInventoryDetails({
            today: today,
            today_percent: today_percent,
            week: week,
            week_percent: week_percent,
            month: month,
            month_percent: month_percent,
            year: year,
            year_percent: year_percent,
            weekly_cost: week_cost,
            weekly_release: week_release
        })
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await axios.get('/api/dashboard')
                .then(res=>{
                    console.log(res)
                    processWeek(res.data.stock, res.data.total)
                })
                .catch(err=>{
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute top-20 right-0 w-full md:w-4/5 p-6">
                {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                    <CardDataSet 
                        title="Today Cost" 
                        total={inventoryDetails.today.toLocaleString('en-US')} 
                        rate={inventoryDetails.today_percent.toLocaleString('en-US')} 
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                    <CardDataSet 
                        title="Weekly Cost" 
                        total={inventoryDetails.week.toLocaleString('en-US')} 
                        rate={inventoryDetails.week_percent.toLocaleString('en-US')}
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                    <CardDataSet 
                        title="Monthly Cost" 
                        total={inventoryDetails.month.toLocaleString('en-US')} 
                        rate={inventoryDetails.month_percent.toLocaleString('en-US')} 
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                    <CardDataSet 
                        title="Yearly Cost" 
                        total={inventoryDetails.year.toLocaleString('en-US')}
                        rate={inventoryDetails.year_percent.toLocaleString('en-US')}
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                </div> */}
                <div className="mt-2 grid grid-cols-12 gap-2">
                    <ChartCard />
                    <BorrowedItemChart stock={inventoryDetails.weekly_cost} release={inventoryDetails.weekly_release} />
                </div>
                <div className="mt-2 grid grid-cols-12 gap-2">
                    <div className="w-full col-span-6 bg-white rounded-lg shadow-md p-6">
                        <p className="text-center text-xl font-bold">Item Dictionary</p>
                        <div className="w-full h-96 overflow-y-scroll">
                            <select>
                                
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}