import React, { useEffect, useState } from "react";
import axios from "axios";
import Credentials from "../Credentials";
import { useNavigate } from "react-router-dom";

function Authenticate()
{
    const spotify = Credentials();
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    let scopes = spotify.SCOPES.join(spotify.SPACE_DELIMETER);

    const getTokenData = (hash) =>
    {
        const params = hash.substring(1).split("&");
        console.log(params);
        return params.map((param) => {
            return param.split("=")[1];
        });
    }

    useEffect(() => {
        if (window.location.hash)
        {
            let data = getTokenData(window.location.hash);
            let accessToken = data[0];
            let tokenType = data[1];
            let expiresIn = data[2];
            localStorage.clear();
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", expiresIn);
            localStorage.setItem("tokenType", tokenType);
            window.location.hash = "";
            navigate('/trends');
        }
    }, []);


    const login = () => {
        window.location = `${spotify.AUTHORIZE_ENDPOINT}?client_id=${spotify.CLIENT_ID}&redirect_uri=${spotify.REDIRECT_URL}&scope=${scopes}&response_type=token&show_dialog=true`;
    }

    return(
        <div>
            <button onClick={login}>Authenticate with Spotify</button>
        </div>
    );
}

export default Authenticate;