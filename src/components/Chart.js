import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({color, data})
{
    const options = {
        colors: [color],
        chart: {
            // background: 'purple',
            toolbar: { show: false },
            zoom: { enabled: false },
            // might need to go back to this and fix this later
            fontFamily: 'Montserrat, sans-serif',
            height: 'auto'
            // type: 'area',
        },
        fill: {
            type: 'gradient',
            gradient: {
                 opacityFrom: 1,
                 opacityTo: 0,
                 shadeIntensity: 0.3
            }
        },
        grid: {
            show: false,
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: {
            categories: ['0 - 10%', '10 - 20%', '20 - 30%', '30 - 40%', '40 - 50%', '50 - 60%', '60 - 70%', '70 - 80%', '80 - 90%', '90 - 100%'],
            axisTicks: { show: false },
            // tickPlacement: 'between',
            // min: 0,
            // max: 1,
            axisBorder: { show: false },
            labels: {
                show: false,
                hideOverlappingLabels: true,
            },
            width: "100%"
        },
        yaxis: { 
            show: false,
            labels: {
                show: false
            }
        }
    }

    const series = [
        {
            name: 'Songs',
            data: data
        }
    ]

    return (
        <ReactApexChart options={options} series={series} type="area" height="100%" width="100%"/>
    );
}

export default Chart;


// need to pass in the following:
// histogram data, - array of ints
// chart labels - array of strings?
