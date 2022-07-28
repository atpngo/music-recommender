import React from "react";
import {Avatar, Stack, Box} from "@mui/material";
import '../style/SongTile.css';


function SongTile(props)
{
    const song = props.song;



    return (

        <div>

            <Stack direction="row" spacing={2} sx={{'paddingRight': '3em', 'paddingLeft': '2em'}}>
                    <Box marginRight={0.5} width={10} display="flex" alignItems="center" justifyContent="center">
                        <p id="number">{song.index}</p>
                    </Box>
                    <Box direction="column" display="flex" alignItems="center">
                    <Avatar variant="square" sx={{width:92, height:92}} src={song.image}/>
                    </Box>
                    <Stack id="desc" direction="column" spacing={-0.5} >
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