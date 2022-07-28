import React from "react";
import SongTile from "./SongTile";
import { List, Paper } from "@mui/material";
import '../style/SongStack.css';

function SongStack(props)
{
    const songs = props.songs;

    return (
        <div>
            <Paper elevation={10} sx={{marginBottom: "1em", marginTop: "20px", width: "20vw", borderRadius: "20px", maxHeight: "90vh", overflow: 'auto'}}>
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