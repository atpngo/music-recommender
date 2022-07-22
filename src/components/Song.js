import React, { useEffect } from "react";

function Song(props)
{
    return (
        <div>
            {props.title} - {props.artist} <br/>
            {/* <Spotify link={props.url}/> */}
            <iframe style={{borderRadius:"12px"}} src={props.url} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay;"></iframe>
        </div>
    );
}

export default Song;