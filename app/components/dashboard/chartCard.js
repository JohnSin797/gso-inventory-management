'use client'

import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Stock and Releases',
    },
  }
}

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default function ChartCard () {

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock',
        data: [1,2,3,4,5,6,7,8,9,10, 11, 12],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Released',
        data: [1,2,3,4,5,6,7,8,9,10, 11, 12],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const [chartComponentVisible, setChartComponentVisible] = useState(false)

    const [state, setState] = useState({
      options: {
        chart: {
          id: "basic-line"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
        series: [
          {
            name: "New Item",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
          },
    
          {
            name: "Borrowed Item",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
          },
        ],
      });

      // useEffect(() => {
      //   if (typeof window !== "undefined") {
      //     setChartComponentVisible(true);
      //   }
      // }, [])

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full gap-3 sm:gap-5">
          <div className="flex w-full md:w-46">
            <span className="flex h-5 w-5 p-1 items-center justify-center rounded-full border border-cyan-400">
              <span className="block h-2 w-2 bg-cyan-400 rounded-full"></span>
            </span>
            <div className="w-full">
              <p className="font-bold text-cyan-400">Total New Item</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex w-full md:w-46">
            <span className="flex h-5 w-5 p-1 items-center justify-center rounded-full border border-indigo-600">
              <span className="block h-2 w-2 bg-indigo-600 rounded-full"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-indigo-600">Total Borrowed Item</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        
      </div>
          <div>
            <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
              {/* {chartComponentVisible && (<ReactApexChart
                options={options}
                series={state.series}
                type="line"
                width="100%"
                height="100%"
              />)} */}
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
    )
}