import React from "react";
import SongTile from "./SongTile";
import ArtistTile from "./ArtistTile";
import { List, Paper } from "@mui/material";
import '../style/TileStack.css';

function TileStack(props)
{
    const data = props.data;
    const title = props.title;
    const type = props.type;
    return (
        <div style={{marginTop: "20px"}}>
            <p style={{marginLeft: "1.1em", marginBottom: "0.3em", color: 'white', fontSize: '1.1em'}}>
                <strong>{title}</strong>
            </p>
            <Paper elevation={10} sx={{marginLeft: "1em", marginBottom: "1em", width: "20vw", borderRadius: "15px", maxHeight: "80vh", overflow: 'auto', backgroundColor: 'rgb(255, 255, 255, 0.5)'}}>
                <br/>
                <List>
                    {type === "songs" ? 
                    data.map((song, key) => {
                        return <div><SongTile data={song}/> <br/></div>
                    })
                    :
                    data.map((artist, key) => {
                        return <div><ArtistTile data={artist}/><br/></div>
                    })
                }
                </List>
            </Paper>
        </div>
    );
}

export default TileStack;

// props:
// songs -> list of objects containing title, artists, image, index