import Navigation from "@/app/components/navigation"

export default function Department() {
    return (
        <div>
            <Navigation />
            <div className="pt-20 font-serif">
                <p className="text-2xl text-center">REPORT ON THE PHYSICAL COUNT OF INVENTORIES</p>
                <p className="text-center">( PER DEPARTMENT )</p>
                <div className="flex justify-between p-6">
                    <div>
                        <input
                            type="text"
                            className="bg-black text-center text-xs border-b border-white"
                            placeholder="Date" 
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="bg-black text-center text-xs border-b border-white"
                        />
                        <p className="text-center text-xs">TOTAL</p>
                    </div>
                </div>
                <table className="table-fixed w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>OFFICE</th>
                            <th>Name of EMPLOYEE</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}