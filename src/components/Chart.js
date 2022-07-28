import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart(props)
{
    const options = {
        colors: ['#EF429F'],
        chart: {
            background: props.bgcolor,
            toolbar: { show: false },
            zoom: { enabled: false },
            // might need to go back to this and fix this later
            height: 400,
            // type: 'area',
        },
        grid: { show: false },
        dataLabels: { enabled: true },
        stroke: { curve: 'smooth' },
        xaxis: {
            categories: props.labels,
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: { show: false }
    }

    const series = [
        {
            name: 'Songs',
            data: props.data
        }
    ]

    return <ReactApexChart options={options} series={series} type="area"/>
}

export default Chart;


// need to pass in the following:
// histogram data, - array of ints
// chart bgcolor - color
// chart labels - array of strings?
