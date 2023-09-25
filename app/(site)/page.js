'use client'

import SideNav from "../components/navigation/sideNav"
import TopNav from "../components/navigation/topNav"
import CardDataSet from "../components/dashboard/cardDataSet"
import { IoTodayOutline } from "react-icons/io5"
import ChartCard from "../components/dashboard/chartCard"
import BorrowedItemChart from "../components/dashboard/borrowedItemChart"

export default function Page () {
    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute top-20 right-0 w-full md:w-4/5 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <CardDataSet 
                        title="Today Cost" 
                        total="$3.456K" 
                        rate="0.43%" 
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                    <CardDataSet 
                        title="Weekly Cost" 
                        total="$3.456K" 
                        rate="0.43%" 
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                    <CardDataSet 
                        title="Monthly Cost" 
                        total="$3.456K" 
                        rate="0.43%" 
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                    <CardDataSet 
                        title="Yearly Cost" 
                        total="$3.456K" 
                        rate="0.43%" 
                        levelUp
                    >
                        <IoTodayOutline />
                    </CardDataSet>
                </div>
                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    <ChartCard />
                    <BorrowedItemChart />
                </div>
            </div>
        </div>
    )
}