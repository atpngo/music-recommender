import React from "react";
import {Paper} from "@mui/material";
import Chart from "./Chart";

function PaperChart(props)
{
    return (
        <div>
            <p style={{marginLeft: "1.1em", marginBottom: "0.3em", color: 'white', fontSize: '1.1em'}}>
                <strong>{props.title}</strong>
            </p>
            <Paper elevation={10} sx={{borderRadius: "10px", backgroundColor: 'rgb(255, 255, 255, 0.3)', marginLeft: '1em', paddingLeft: '1em', marginBottom: '1em'}}>
                <Chart {...props} />
            </Paper>
        </div>
    );
}

export default PaperChart;
