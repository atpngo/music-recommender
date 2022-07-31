import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";




function Test()
{

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    return(
        <div>
            <Loading/>
        </div>

    )
}

export default Test;