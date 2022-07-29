import React from "react";
import { List, Paper } from "@mui/material";


function ArtistStack(props)
{   
    const artists = props.artists;

    return (
        <div style={{marginTop: "20px"}}>
            <p style={{marginLeft: "1.1em", marginBottom: "0.3em", color: 'white', fontSize: '1.1em'}}>
                <strong>Top 50 Artists</strong>
            </p>
            <Paper elevation={10} sx={{marginLeft: "1em", marginBottom: "1em", width: "20vw", borderRadius: "15px", maxHeight: "80vh", overflow: 'auto', backgroundColor: 'rgb(255, 255, 255, 0.5)'}}>
                <br/>
                <List>
                    {artists.map((artist, key) => {
                        return <div><SongTile artist={artist}/></div>
                    })}
                </List>
            </Paper>
        </div>
    );
}

export default ArtistStack;

// props
// artists -> name, image, follower count, index 