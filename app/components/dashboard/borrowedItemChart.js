'use client'

import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const options = {
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      // events: {
      //   beforeMount: (chart) => {
      //     chart.windowResizeHandler();
      //   },
      // },
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
  
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
  
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
  
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

export default function BorrowedItemChart () {

  const [chartComponentVisible, setChartComponentVisible] = useState(false)

    const [state, setState] = useState({
        series: [
          {
            name: "New Item",
            data: [44, 55, 41, 67, 22, 43, 65],
          },
          {
            name: "Borrowed Item",
            data: [13, 23, 20, 8, 13, 27, 15],
          },
        ],
      });

      useEffect(() => {
        if (typeof window !== "undefined") {
          setChartComponentVisible(true);
        }
      }, [])

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
          {chartComponentVisible && (
            <ApexCharts
              options={options}
              series={state.series}
              type="bar"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
    )
}