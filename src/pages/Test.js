import axios from "axios";
import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import CartPopup from "../components/CartPopup";
import CurrentSong from "../components/CurrentSong";




function Test()
{

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    const [open, setOpen] = useState(false);

    useEffect(() =>
    {

    }, []);


    const debug = () =>
    {
        setOpen(true);
    }

    const handleClose = () =>
    {
        setOpen(false);
    }
    return(
        <div>
            <button onClick={debug}>Debug</button>
            <CartPopup open={open} onClose={handleClose}/>
        </div>

    )
}

export default Test;