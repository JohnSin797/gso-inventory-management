'use client'

import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"

export default function CardDataSet ({ title, total, rate, levelUp, levelDown, children }) {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7 shadow-md dark:bg-boxdark">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900/10 text-indigo-600">
                {children}
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-2xl font-bold text-black">
                        {total}
                    </h4>
                    <span className="text-sm font-medium text-gray-400">{title}</span>
                </div>

                <span
                    className={`flex items-center gap-1 text-sm font-medium ${
                        levelUp && 'text-green-500'
                    } ${levelDown && 'text-red-500'} `}
                    >
                    {rate}

                    {levelUp && (
                        <AiOutlineArrowUp className="text-green-500" />
                    )}
                    {levelDown && (
                        <AiOutlineArrowDown className="text-red-500" />
                    )}
                </span>
            </div>
        </div>
    )
}