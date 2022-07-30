import { Avatar, IconButton, Paper, Stack } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';

// hmmm do i implement marquees here?
function CurrentSong(props)
{

    const ButtonStyle = styled(IconButton)(({theme}) => ({
        color: 'white',
        width: '125px',
        height: '125px',
    }));

    const YesButton = styled(ButtonStyle)(({theme}) => ({
        backgroundColor: '#72AF5C',
        '&:hover': {
            backgroundColor: '#67a152'
        }
    }));

    const NoButton = styled(ButtonStyle)(({theme}) => ({
        backgroundColor: '#E25D5D',
        '&:hover': {
            backgroundColor: '#c95151'
        }
    }))
    
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
                    <Stack direction="row" sx={{marginTop: '3vh'}}>
                        <NoButton component={Paper} elevation={3}>
                            <CloseIcon sx={{fontSize: '365%'}}/>
                        </NoButton>
                        {/* Distance between buttons */}
                        <div style={{marginLeft: '200px'}}/>
                        {/* <YesButton aria-label="yes" sx={{backgroundColor: '#72AF5C', color: 'white', width: '125px', height: '125px'}}> */}
                        <YesButton component={Paper} elevation={3}>
                            {/* <FavoriteIcon sx={{transform: 'scale(3)'}} /> */}
                            <FavoriteIcon sx={{fontSize: '325%'}} />
                        </YesButton>
                    </Stack>
                </Stack>
            </Paper>
        </div>
    );
}

export default CurrentSong;

// props
// title, artists, image
