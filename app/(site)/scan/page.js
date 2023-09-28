'use client';

import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function Scan () {

    const [searchItemResult, setSearchItemResult] = useState({
        description: ['']
    })
    const [searchStockResult, setSearchStockResult] = useState({})
    const [searchReleaseResult, setSearchReleaseResult] = useState([])

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });
      
        scanner.render(success, error);
      
        function success(result) 
        {
            scanner.clear();
            searchForItem(result);
        }
      
        function error(err)
        {
            console.log(err);
        }

        const searchForItem = async () => {
            try {
                await axios.post()
                .then(res=>{
                    setSearchItemResult(res.data.item)
                    setSearchStockResult(res.data.stock)
                    setSearchReleaseResult(res.data.releases)
                })
                .catch(err=>{
                    console.log(err.message)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 space-y-2">
                <div className="w-full bg-white rounded-lg p-6 shadow-md flex gap-2">
                    <div className="w-full h-64 md:w-1/4 border border-slate-900 rounded-lg">
                        <div id="reader" className="w-full h-full"></div>
                    </div>
                    <div className="w-full h-64 p-6 overflow-y-scroll md:w-3/4 border border-slate-900 rounded-lg">
                        <p>Item Name: {searchItemResult?.item_name}</p>
                        <p>Property Number: {searchItemResult?.item_name}</p>
                        <p>Barcode: {searchItemResult?.barcode_text}</p>
                        <p>Unit: {searchItemResult?.unit}</p>
                        <p>Description:</p>
                        {
                            searchItemResult?.description.map((item,id)=>{
                                return(<p key={id}>{item}</p>)
                            })
                        }
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg p-6 shadow-md">
                    <div className="w-full h-40 overflow-scroll">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th>Inventory Tag</th>
                                <th>Stock</th>
                                <th>Source of Funds</th>
                                <th>Unit Cost</th>
                                <th>Total Cost</th>
                                <th>Released</th>
                                <th>Date Released</th>
                                <th>Condemned</th>
                                <th>Employee Name</th>
                                <th>Returned</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchReleaseResult.length != 0 ?
                                    searchReleaseResult.map((item,id)=>{
                                        return (
                                            <tr key={id}>
                                                <td>{item?.inventory?.inventory_tag}</td>
                                                <td>{item?.inventory?.stock}</td>
                                                <td>{item?.inventory?.source_fund}</td>
                                                <td>{item?.inventory?.unit_cost}</td>
                                                <td>{item?.inventory?.total_cost}</td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.release_date}</td>
                                                <td>{item?.inventory?.condemned}</td>
                                                <td>{item?.employee?.first_name}</td>
                                                <td>{item?.employee?.last_name}</td>
                                                <td>{item?.returned}</td>
                                                <td>{item?.remarks}</td>
                                            </tr>
                                        )
                                    })
                                :
                                (
                                    <tr>
                                        <td>{searchStockResult?.inventory_tag}</td>
                                        <td>{searchStockResult?.stock}</td>
                                        <td>{searchStockResult?.source_fund}</td>
                                        <td>{searchStockResult?.unit_cost}</td>
                                        <td>{searchStockResult?.total_cost}</td>
                                        <td>{searchStockResult?.released}</td>
                                        <td>#</td>
                                        <td>{searchStockResult?.condemned}</td>
                                        <td>#</td>
                                        <td>#</td>
                                        <td>#</td>
                                        <td>{searchStockResult?.remarks}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}