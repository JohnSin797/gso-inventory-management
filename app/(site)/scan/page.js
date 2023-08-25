'use client'

import Navigation from "@/app/components/navigation"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

export default function Scan () {
    const [scanResult, setScanResult] = useState(null);
    const [itemCode, setItemCode] = useState("");

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
          setScanResult(result);
        }
      
        function error(err)
        {
          console.log(err);
        }
      }, []);

    return (
        <div>
            <Navigation />
            <div className="pt-20 px-10 w-full md:flex">
                <div className="h-76 sm:w-full md:w-96 p-6">
                    {
                        scanResult ? <p>Scan success! {scanResult}</p>
                        :  
                        <div id='reader'></div>
                    }
                </div>
                <div className="w-full border rounded p-6 space-y-2">
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Item Name" 
                    />
                    <input 
                        type="text"
                        className="w-full bg-black border-b"
                        placeholder="Item Code" 
                        value={scanResult}
                    />
                    <button 
                        className="border p-1 rounded w-1/6 hover:bg-cyan-900"
                    >
                        save
                    </button>
                </div>
            </div>
        </div>
    )
}