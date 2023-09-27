'use client'

import { QRCodeCanvas } from "qrcode.react"
import { useState } from "react"
import Barcode from "react-barcode"

export default function QrCode ({ isHidden, hiddenChange, code }) {

    const [useBarCode, setUseBarCode] = useState(false)

    const downloadQRCode = (e) => {
        e.preventDefault()
        const qrCodeURL = document.getElementById('qrCode')
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
        console.log(qrCodeURL)
        let aEl = document.createElement("a")
        aEl.href = qrCodeURL;
        aEl.download = code+".png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }

    return (
        <div className={`fixed z-50 w-full h-full bg-slate-900/50 flex justify-center items-center ${isHidden ? 'hidden' : ''}`}>
            <div className="border border-white rounded-lg p-6">
                <form onSubmit={downloadQRCode} className="space-y-2">
                    <button
                        onClick={()=>setUseBarCode(!useBarCode)}
                        className="p-1 bg-white rounded-lg text-slate-900 w-full"
                    >
                        switch to {useBarCode ? <span>QR Code</span> : <span>Barcode</span>}
                    </button>
                    {
                        useBarCode ?
                        <Barcode 
                            id="qrCode"
                            value={code}
                            size={300}
                        />
                        :
                        <QRCodeCanvas 
                            id="qrCode"
                            value={code}
                            size={300}
                            level={"H"}
                        />
                    }
                    <button
                        type="submit"
                        className="w-full p-2 rounded-lg border border-white text-white"
                        disabled={!code}
                    >
                        save
                    </button>
                    <button
                        type="button"
                        className="w-full p-2 rounded-lg border border-white text-white"
                        onClick={()=>hiddenChange(true)}
                    >
                        close
                    </button>
                </form>
            </div>
        </div>
    )
}