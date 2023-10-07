'use client'

import { HiMagnifyingGlass } from "react-icons/hi2"
import ProfileDropDown from "./profileDropDown"
import { useEffect, useState } from "react"
import axios from "axios"

export default function TopNav () {
    const [searchOptions, setSearchOptions] = useState([])

    useEffect(()=>{
        const getData = async () => {
            try {
                await axios.get('/api/navigation/search')
                .then(res=> {
                    
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
        <div className="fixed top-0 right-0 w-full md:w-4/5 h-20 z-50 bg-white">
            <form className="flex p-6">
                <button
                    type="submit"
                >
                    <HiMagnifyingGlass className="w-6 h-6 hover:text-blue-600" />
                </button>
                <input 
                    type="text"
                    className="border-none outline-none p-2 md:w-1/2"
                    placeholder="Type to search..."
                />
                <ProfileDropDown />
            </form>
        </div>
    )
}