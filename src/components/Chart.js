import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart(props)
{
    const options = {
        colors: ['#EF429F'],
        chart: {
            background: "rgb(255,255,255, 0)",
            // background: props.bg,
            // background: 'green',
            toolbar: { show: false },
            zoom: { enabled: false },
            // might need to go back to this and fix this later
            fontFamily: 'Montserrat, sans-serif',
            // type: 'area',
        },
        grid: {
            show: false,
        },
        dataLabels: { enabled: true },
        stroke: { curve: 'smooth' },
        xaxis: {
            categories: props.labels || ['0.0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1.0'],
            axisTicks: { show: false },
            // tickPlacement: 'between',
            // min: 0,
            // max: 1,
            axisBorder: { show: false },
            labels: {
                show: true,
                hideOverlappingLabels: true,
            },
            width: "100%"
        },
        yaxis: { 
            show: true,
            labels: {
                show: false
            }
        }
    }

    const series = [
        {
            name: 'Songs',
            data: props.data
        }
    ]

    return (
        <div style={{}}>
            <ReactApexChart options={options} series={series} type="area" height="200vh" width="600px"/>
        </div>
    );
}

export default Chart;


// need to pass in the following:
// histogram data, - array of ints
// chart labels - array of strings?
