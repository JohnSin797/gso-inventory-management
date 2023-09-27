'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";

export default function Scan () {
    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6">
                <div className="w-full bg-white rounded-lg p-6">
                    
                </div>
            </div>
        </div>
    )
}