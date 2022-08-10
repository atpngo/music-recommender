import React from "react";
import SongTile from "./SongTile";
import ArtistTile from "./ArtistTile";
import { Paper } from "@mui/material";
import '../style/TileStack.css';
import spotifyLogo from "../media/Spotify_Logo_RGB_White.png";

function TileStack(props)
{
    const data = props.data;
    const title = props.title;
    const type = props.type;
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5vh'}}>
                <p style={{color: 'white', fontSize: '1.1em', }}>
                    <strong>{title}</strong>
                </p>
                <img src={spotifyLogo} width='100em'/>
            </div>
            <Paper elevation={10} sx={{width: "18vw", borderRadius: "15px", height: "80vh", backgroundColor: 'rgb(255, 255, 255, 0.25)', display: 'flex', flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center', overflow: 'hidden', overflowY: 'scroll', paddingLeft: '2vw'}}>
                    {type === "songs" ? 
                        data.map((song, key) => {
                            return <SongTile data={song}/>
                        })
                        :
                        data.map((artist, key) => {
                            return <ArtistTile data={artist}/>
                        })
                    }
            </Paper>
        </div>
    );
}

export default TileStack;

// props:
// songs -> list of objects containing title, artists, image, index