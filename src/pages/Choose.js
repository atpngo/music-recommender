import React from "react";
import { useNavigate } from "react-router-dom";

function Choose()
{
    const navigate = useNavigate();
    const goToPlaylist = () =>
    {
        navigate('/create_playlist');
    }

    const goToData = () =>
    {
        navigate('/trends');
    }
    
    return (
        <div>
            <button onClick={goToPlaylist}>Go to Playlist</button>
            <button onClick={goToData}>Go to Data</button>
        </div>
    )
}

export default Choose;