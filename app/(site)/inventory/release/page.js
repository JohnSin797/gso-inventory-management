'use client'

import EmployeeSelect from "@/app/components/employeeSelect";
import ItemSelect from "@/app/components/itemSelect";
import SideNav from "@/app/components/navigation/sideNav";
import TopNav from "@/app/components/navigation/topNav";
import InventorySelect from "@/app/components/select/inventorySelect";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";

export default function Release () {

    const [selectedEmployee, setSelectedEmployee] = useState('')
    const router = useRouter()
    const [itemStocks, setItemStocks] = useState(null)
    const [selectedItem, setSelectedItem] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [remarks, setRemarks] = useState('')
    const [data, setData] = useState({
        items: [],
        employees: []
    })

    const releaseItem = async (e) => {
        try {
            e.preventDefault()
            console.log(selectedItem)
            await axios.post('/api/inventory/release', {
                employee: selectedEmployee,
                item_id: selectedItem,
                quantity: quantity,
                release_date: releaseDate,
                remarks: remarks
            })
            .then(res=>{
                setSelectedEmployee('')
                setSelectedItem('')
                setReleaseDate('')
                setQuantity('')
                setRemarks('')
                setItemStocks(null)
                Swal.fire(res.data.message)
                router.push('/inventory')
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onEmployeeChange = (e) => {
        setSelectedEmployee(e.value)
    }

    const onItemChange = e => {
        const val = e.value
        const stock = e.stocks
        setSelectedItem(val)
        setItemStocks(stock)
    }

    function setOptions(items, employees) {
        let itemArr = []
        let ampArr = []
        console.log(items)
        items.forEach(element => {
            const itemObj = {
                value: element?._id,
                label: element?.item?.item_name,
                stocks: element?.stock
            }
            itemArr.push(itemObj)
        });
        employees.forEach(element => {
            const empObj = {
                value: element?._id,
                label: element?.first_name+' '+element?.last_name
            }
            ampArr.push(empObj)
        })
        setData({
            items: itemArr,
            employees: ampArr
        })
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                await axios.get('/api/inventory/select')
                .then(res=>{
                    console.log(res)
                    setOptions(res.data.data, res.data.employees)
                })
                .catch(err=>{
                    console.log(err.message)
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        
        getData()
    }, [])

    return (
        <div>
            <TopNav />
            <SideNav />
            <div className="absolute w-full md:w-4/5 top-20 right-0 p-6 flex justify-center items-center">
                <div className="w-full md:w-3/5 p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={releaseItem} className="w-full">
                        <p className="text-2xl text-center font-bold">Release Item</p>
                        <div className="w-full">
                            <label className="text-xs font-bold">Employee</label>
                            {/* <EmployeeSelect className={'w-full p-2 border hover:border-black rounded-lg'} employees={data.employees} onEmployeeChange={setSelectedEmployee} /> */}
                            <Select 
                                options={data.employees}
                                onChange={onEmployeeChange}
                                defaultInputValue={selectedEmployee}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">Item</label>
                            {/* <InventorySelect className={'w-full p-2 border hover:border-black rounded-lg'} items={data.items} onItemChange={setSelectedItem} /> */}
                            <Select 
                                options={data.items}
                                onChange={onItemChange}
                                defaultInputValue={selectedItem}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="text-xs font-bold">Release Date</label>
                                <input 
                                    type="date"
                                    className="w-full p-2 rounded-lg border hover:border-black"
                                    onChange={(e)=>setReleaseDate(e.target.value)}
                                    value={releaseDate}
                                    required
                                />
                            </div>
                            <div className="w-1/4">
                                <label className="text-xs font-bold text-indigo-600">Stocks</label>
                                <input 
                                    type="text"
                                    className="w-full p-2 rounded-lg border hover:border-indigo-900 bg-indigo-600 text-white"
                                    defaultValue={itemStocks}
                                    readOnly
                                />
                            </div>
                            <div className="w-1/4">
                                <label className={`text-xs font-bold ${itemStocks<quantity ? 'text-red-600' : ''}`}>Quantity</label>
                                <input 
                                    type="number"
                                    className={`w-full p-2 rounded-lg border ${itemStocks<quantity ? 'border-red-600 text-red-600' : 'hover:border-black'}`}
                                    onChange={(e)=>setQuantity(e.target.value)}
                                    value={quantity}
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="text-xs font-bold">Remarks</label>
                            <textarea 
                                type="text"
                                className="w-full p-2 rounded-lg border hover:border-black resize-none"
                                onChange={(e)=>setRemarks(e.target.value)}
                                value={remarks}
                                placeholder="Type here..."
                            />
                        </div>
                        <div className="w-full py-6 flex gap-2">
                            <Link
                                href={'/inventory'}
                                className="block p-2 w-full md:w-1/2 rounded-lg bg-slate-800 hover:bg-slate-800/80 text-center text-white"
                            >
                                back
                            </Link>
                            <button
                                type="submit"
                                disabled={itemStocks<quantity}
                                className="w-full md:w-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-600/80 text-white"
                            >
                                save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}