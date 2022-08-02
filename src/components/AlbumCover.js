import { Avatar, Paper } from "@mui/material";
import React from "react";

function AlbumCover(props)
{

    return(
        <div>
            <Avatar component={Paper} elevation={2} variant="square" sx={{width: '10vw', height: '10vw', margin: '20px', marginTop: '0px', borderRadius: '5px'}} src={props.image}/>
        </div> 

    );
}

export default AlbumCover;