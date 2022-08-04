import { Avatar, Paper } from "@mui/material";
import React from "react";
import useWindowDimensions from "../util/Window";

function AlbumCover(props)
{
    const {width, height} = useWindowDimensions();

    if (width < height)
    {
        return(
            <div>
                <Avatar component={Paper} elevation={2} variant="square" sx={{width: '15vw', height: '15vw', margin: '20px', marginTop: '0px'}} src={props.image} imgProps={{draggable: false}}/>
            </div> 
        );
    }
    return(
        <div>
            <Avatar component={Paper} elevation={2} variant="square" sx={{width: '10vw', height: '10vw', margin: '20px', marginTop: '0px'}} src={props.image} imgProps={{draggable: false}}/>
        </div> 

    );
}

export default AlbumCover;