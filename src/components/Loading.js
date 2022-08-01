import React from "react";
import '../style/Loading.css';
import trackImg from '../media/track.png';

function Loading()
{
    return(
        <div class="loader-container">
            <img class="spinner" src={trackImg}></img>
        </div>
    )
}

export default Loading;