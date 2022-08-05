import { Avatar, Paper, Stack } from "@mui/material";
import React, {useState} from "react";
import useWindowDimensions from "../util/Window";

// hmmm do i implement marquees here?
function CurrentSong(props)
{

    const {width, height} = useWindowDimensions();
    const [val, setVal] = useState('40vw');
    
    
    return(
        <div>
            <Paper elevation={10} sx={{width: (width >= height) ? '40vw' : '90vw', height: (width >= height) ? '85vh' : (width <= 450) ? '65vh' : '85vh', backgroundColor: 'rgb(255,255,255,0.0)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Stack direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar component={Paper} elevation={5} variant="square" src={props.song.image} sx={{width: (width > height) ? '60%' : '75%', height: "auto"}} imgProps={{draggable: false}}/>

                    {/* Song Name */}
                    {/* <p style={{fontSize: '2.5em', marginBottom: '10px', marginTop: '10px', color: 'white'}}>{props.song.title}</p> */}
                    <p style={{fontSize: '1.75em', marginBottom: '10px', marginTop: '10px', color: 'white', textAlign: 'center'}}>{props.song.title}</p>
                    {/* Artist Name */}
                    <p style={{fontSize: '1.25em', color: 'white'}}>{props.song.artist}</p>
                    {props.children}
                </Stack>
            </Paper>
        </div>
    );
}

export default CurrentSong;

// props
// title, artists, image
