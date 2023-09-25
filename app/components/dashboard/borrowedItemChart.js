'use client'

import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function BorrowedItemChart () {

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Stock and Releases Graph',
      },
    },
  }

  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock',
        data: [1,2,3,4,5,6,7,8,9,10,11],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Released',
        data: [1,2,3,4,5,6,7,8,9,10,11],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black">
            Profit this week
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="">This Week</option>
              <option value="">Last Week</option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <MdOutlineKeyboardArrowDown />
            </span>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
    )
}