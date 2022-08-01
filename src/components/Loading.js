import React from "react";
import '../style/Loading.css';
import trackImg from '../media/track.png';

function Loading()
{
    return(
        // bouncing 3 dots
        // <div class="loader">
        //     <span></span>
        //     <span></span>
        //     <span></span>
        // </div>

        // spining track
        <div class="loader-container">
            <img class="spinner" src={trackImg}></img>
        </div>
    )
}

export default Loading;