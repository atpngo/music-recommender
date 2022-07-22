import React, { useEffect, useState } from "react";
import axios from "axios";

function Favorite()
{
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("accessToken"))
        {
            setToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const getPlaylists = () =>
    {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers : {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => {
            console.log(res.data);
        });
    }
    
    return(
        <div>
            <button onClick={getPlaylists}>fetch</button>
        </div>
    );
}

export default Favorite;
