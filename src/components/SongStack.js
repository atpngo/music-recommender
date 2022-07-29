import React from "react";
import SongTile from "./SongTile";
import { List, Paper } from "@mui/material";
import '../style/SongStack.css';

function SongStack(props)
{
    const songs = props.songs;

    return (
        <div style={{marginTop: "20px"}}>
            <p style={{marginLeft: "1.1em", marginBottom: "0.3em", color: 'white', fontSize: '1.1em'}}>
                <strong>Top 50 Tracks</strong>
            </p>
            <Paper elevation={10} sx={{marginLeft: "1em", marginBottom: "1em", width: "20vw", borderRadius: "15px", maxHeight: "80vh", overflow: 'auto', backgroundColor: 'rgb(255, 255, 255, 0.5)'}}>
                <br/>
                <List>
                    {songs.map((song, key) => {
                        return <div><SongTile song={song}/> <br/></div>
                    })}
                </List>
            </Paper>
        </div>
    );
}

export default SongStack;

// props:
// songs -> list of objects containing title, artists, image, index