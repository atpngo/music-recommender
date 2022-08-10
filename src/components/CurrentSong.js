import { Avatar, Paper, Stack } from "@mui/material";
import React, {useState} from "react";
import useWindowDimensions from "../util/Window";
import spotifyLogo from "../media/Spotify_Logo_RGB_White.png";

// hmmm do i implement marquees here?
function CurrentSong(props)
{

    const {width, height} = useWindowDimensions();
    const [val, setVal] = useState('40vw');
    
    const linkToSpotify = () =>
    {
        window.open(props.song.spotify);
    }
    
    return(
        <div>
            <Paper elevation={10} sx={{width: (width >= height) ? '40vw' : '90vw', height: (width >= height) ? '85vh' : (width <= 450) ? '65vh' : '85vh', backgroundColor: 'rgb(255,255,255,0.0)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Stack direction="column" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img src={spotifyLogo} width='30%' style={{marginBottom: '1em'}} onClick={linkToSpotify}/>
                    <Avatar component={Paper} elevation={5} variant="square" onClick={linkToSpotify} src={props.song.image} sx={{width: (width > height) ? '50%' : '60%', height: "auto"}} imgProps={{draggable: false}}/>

                    {/* Song Name */}
                    {/* <p style={{fontSize: '2.5em', marginBottom: '10px', marginTop: '10px', color: 'white'}}>{props.song.title}</p> */}
                    <p style={{fontSize: '1.75em', marginBottom: '10px', marginTop: '10px', color: 'white', textAlign: 'center' }} onClick={linkToSpotify} >{props.song.title}</p>
                    {/* Artist Name */}
                    <p style={{fontSize: '1.25em', color: 'white'}} onClick={linkToSpotify}>{props.song.artist}</p>
                    {props.children}
                </Stack>
            </Paper>
        </div>
    );
}

export default CurrentSong;

// props
// title, artists, image
