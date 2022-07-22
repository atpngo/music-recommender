import axios from "axios";
import React from "react";

function Test()
{

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    const doThing = () =>
    {
        spotify.get('me/top/artists')
        .then(res => {
            console.log(res);
        });
    }
    return(
        <div>
            <button onClick={doThing}>Click me </button>
        </div>

    )
}

export default Test;