import React from "react";
import {Avatar, Stack, Box} from "@mui/material";
import '../style/Tile.css';


function ArtistTile(props)
{
    const artist = props.data;

    return (
        <div>
            <Stack direction="row" spacing={2} sx={{'paddingRight': '3em', 'paddingLeft': '2em'}}>
                    <Box marginRight={0.5} width={10} display="flex" alignItems="center" justifyContent="center">
                        <p id="number">{artist.index}</p>
                    </Box>
                        <Box direction="column" display="flex" alignItems="center">
                        <Avatar variant="circle" sx={{width:92, height:92}} src={artist.image}/>
                        </Box>
                        <Stack id="desc" direction="column" spacing={-0.5} >
                            <p id="artist">{artist.title}</p>
                            <p id="followers">{artist.artists}</p>
                        </Stack>
            </Stack>
        </div>
    )
}

export default ArtistTile;

// props:
// song - object containing title, artists, image, index