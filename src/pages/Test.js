import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import '../style/RoundButton.css';
import x from '../media/x.png';
import heart from '../media/heart.png';

function Test()
{

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    const debug = () => 
    {
        console.log("hey");
    }

    const HeartButton = (props) => 
    {
        return(
            <div onClick={props.onClick} class="round-button">
                <div class="heart-button">
                    <img draggable="false" class="x" src={heart}></img>
                </div>
            </div>
        );
    }

    const NoButton = (props) => 
    {
        return(
            <div onClick={props.onClick} class="round-button">
                <div class="no-button">
                    <img draggable="false" class="x" src={x}></img>
                </div>
            </div>
        );
    }

    


    return(
        <div>
        <NoButton onClick={debug}/>
        <HeartButton onClick={debug}/>
        </div>
    )
}

export default Test;