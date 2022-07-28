import React from "react";
import {Avatar, Stack, Box} from "@mui/material";
import '../style/SongTile.css';


function SongTile(props)
{
    const song = props.song;



    return (

        <div>

            <Stack direction="row" spacing={1}>
                    <Box marginLeft={1} width={30} display="flex" alignItems="center" justifyContent="center">
                        <p id="number">{song.index}</p>
                    </Box>
                    <Avatar variant="square" sx={{width:92, height:92}} src={song.image}/>
                    <Stack id="desc" direction="column" spacing={-0.5}>
                        <p id="song">{song.title}</p>
                        <p id="artists">{song.artists}</p>

                    </Stack>
            </Stack>

        </div>

    )
}

export default SongTile;

// props:
// song - object containing title, artists, image, index