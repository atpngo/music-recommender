import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePlaylist()
{
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState("Default Title");
    const [desc, setDesc] = useState("");
    const [id, setId] = useState(null);

    const navigate = useNavigate();

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    useEffect(() => {
        spotify.get("me").then(res => {console.log(res.data); setId(res.data.id)});
    }, [])

    const validate = () =>
    {
        if (title && desc)
        {
            // create spotify playlist

            // add playlist id to localstorage?
            return true;
        }
        
        return false;
        
    }

    const generate = () =>
    {
        if (validate())
        {
            // create a playlist 
        }
    }

    const navigateToTinder = () =>
    {
        // generate playlist
        spotify.post("https://api.spotify.com/v1/users/" + id + "/playlists", {
            name:title,
            description:desc,
            public:false,
        })
        .then(res => {
            localStorage.setItem("playlistId", res.data.id);
            navigate('/songs');
        });

    }

    const changeTitle = () =>
    {
        setTitle(document.getElementById("name").value);
    }

    const changeDesc = () =>
    {
        setDesc(document.getElementById("description").value);
    }

    return (
        <div>
            <input id="name" placeholder="Playlist Title" onChange={changeTitle}></input>
            <br/>
            <input id="description" placeholder="Description" onChange={changeDesc}></input>
            <div>
                <button>Generate one for me</button>
                <button onClick={navigateToTinder}>I'll choose songs myself</button>
            </div> 
        </div>
    )
}

export default CreatePlaylist;