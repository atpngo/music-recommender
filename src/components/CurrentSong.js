import { Avatar, Paper, Stack } from "@mui/material";
import React from "react";

// hmmm do i implement marquees here?
function CurrentSong(props)
{

    
    
    return(
        <div>
            <Paper elevation={10} sx={{width: '600px', height: '85vh', backgroundColor: 'rgb(255,255,255,0.18)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Stack direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar component={Paper} elevation={5} variant="square" src={props.song.image} sx={{width: '80%', height: "auto", borderRadius: '10px'}}/>

                    {/* Song Name */}
                    {/* <p style={{fontSize: '2.5em', marginBottom: '10px', marginTop: '10px', color: 'white'}}>{props.song.title}</p> */}
                    <p style={{fontSize: '2vw', marginBottom: '10px', marginTop: '10px', color: 'white'}}>{props.song.title}</p>
                    {/* Artist Name */}
                    <p style={{fontSize: '1.25vw', color: 'white'}}>{props.song.artist}</p>
                    {props.children}
                </Stack>
            </Paper>
        </div>
    );
}

export default CurrentSong;

// props
// title, artists, image
