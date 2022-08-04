import React, { useEffect, useState } from "react";
import axios from "axios";
import Credentials from "../Credentials";
import { useNavigate } from "react-router-dom";
import demo from '../media/demo.mp4';
import logo from '../media/logo.png';
import { Button, Paper, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import spotifyLogo from '../media/spotify.png';
import useWindowDimensions from "../util/Window";

// Spotify Button
function SpotifyButton(props)
{
    const CustomButton = styled(Button)(({theme}) => ({
        color: 'white',
        fontSize: '2vw',
        lineHeight: '1em',
        textTransform: 'none',
        backgroundColor: '#7DE774',
        width: '50%',
        height: '15vh',
        borderRadius: '30px',
        '&:hover' : {
            backgroundColor: '#73e069'
        }
    }))
    return(
        <CustomButton component={Paper} elevation={5} onClick={props.onClick}>
            <Stack direction="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img draggable="false" src={spotifyLogo} width='20%' height='20%'/>
                
                <Stack direction="column" sx={{marginLeft: '40px', display: 'flex', alignItems: 'center'}}>
                    <p>Login with</p>
                    <p>Spotify</p>
                </Stack>
            </Stack>
        </CustomButton>
    )
}

function MobileSpotifyButton(props)
{
    const CustomButton = styled(Button)(({theme}) => ({
        color: 'white',
        fontSize: '1.2em',
        lineHeight: '1em',
        textTransform: 'none',
        backgroundColor: '#7DE774',
        width: '200px',
        height: '10vh',
        borderRadius: '2vw',
        '&:hover' : {
            backgroundColor: '#73e069'
        }
    }))
    return(
        <CustomButton component={Paper} elevation={5} onClick={props.onClick}>
            <Stack direction="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img draggable="false" src={spotifyLogo} width='20%' height='20%'/>
                
                <Stack direction="column" sx={{marginLeft: '10%', display: 'flex', alignItems: 'center'}}>
                    <p>Login with</p>
                    <p>Spotify</p>
                </Stack>

            </Stack>
        </CustomButton>
    )
}

function Authenticate()
{
    // const spotify = Credentials();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const {height, width} = useWindowDimensions();

    let scopes = process.env.REACT_APP_SCOPES.split(' ').join(process.env.REACT_APP_SPACE_DELIMETER);

    const getTokenData = (hash) =>
    {
        const params = hash.substring(1).split("&");
        console.log(params);
        return params.map((param) => {
            return param.split("=")[1];
        });
    }

    useEffect(() => {
        console.log('start');
        console.log(process.env.REACT_APP_AUTHORIZE_ENDPOINT);
        console.log('end');


        if (window.location.hash)
        {
            let data = getTokenData(window.location.hash);
            let accessToken = data[0];
            let tokenType = data[1];
            let expiresIn = data[2];
            localStorage.clear();
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresIn", expiresIn);
            localStorage.setItem("tokenType", tokenType);
            window.location.hash = "";
            navigate('/trends');
        }
    }, []);


    const login = () => {
        window.location = `${process.env.REACT_APP_AUTHORIZE_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&scope=${scopes}&response_type=token&show_dialog=true`;
    }

    const debug = () =>
    {

    }

    const subtitle = {
        fontSize:'1.25vw', color: 'white'
    }

    const mobileSubtitle = {
        fontSize: '1em', color: 'white'
    }
    if (width < height)
    {
        return(
            <div style={{display: 'flex', height: '100vh',alignItems: 'center', justifyContent: 'center'}}>
                <Stack direction="column" style={{display: 'flex', alignItems: 'center'}}>
                    <img draggable="false" width="90%" src={logo}/>
                    <div style={{marginTop: '2vh'}}/>
                    <p style={mobileSubtitle}>
                        Find your favorite <strong>singles</strong> :D
                    </p>
                    <p style={mobileSubtitle}>hahahah lol</p>
                    <div style={{marginTop: '10%'}}/>

                    <MobileSpotifyButton onClick={login}/>
                    <div style={{marginTop: '10%'}}/>
                    <Paper elevation={10} sx={{width: '80%', height: '30%',backgroundColor: 'rgb(255,255,255,0.25)', padding: '15px 15px 12px 15px', borderRadius: '10px'}}>
                    <video width='100%' muted autoPlay={"autoplay"} preLoad="auto" loop src={demo}/>
                    </Paper>
                    <p style={{marginTop: '10%', fontSize: '1em', color: 'white', fontWeight: 'bold'}}>
                    Made by <a style={{color: 'white', textDecoration: 'none'}} target="_blank" href="https://github.com/atpngo">Andy Ngo</a>
                    </p>
                </Stack>
            </div>
        );
    }

    return(
        <div style={{display: 'flex', height: '100vh',alignItems: 'center', justifyContent: 'center'}}>
            <Stack direction="column" style={{display: 'flex', alignItems: 'center'}}>
            <Stack direction="row">
                <Stack direction="column" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%'}}>
                    {/* <button onClick={debug}>Debug</button> */}
                    <img draggable="false" width="90%" src={logo}/>
                    <div style={{marginTop: '2vh'}}/>
                    <p style={subtitle}>
                        Find your favorite <strong>singles</strong> :D
                    </p>
                    <p style={subtitle}>hahahah lol</p>
                    <div style={{marginTop: '10vh'}}/>
                    <SpotifyButton onClick={login}/>
                </Stack>
                <div style={{marginLeft: '5%'}}></div>
                {/* Demo video */}
                <Paper elevation={10} sx={{width: '40vw', height: '30%',backgroundColor: 'rgb(255,255,255,0.25)', padding: '15px 15px 12px 15px', borderRadius: '10px'}}>
                    <video width='100%' muted autoPlay={"autoplay"} preLoad="auto" loop src={demo}/>
                </Paper>
                
            </Stack>
            <p style={{marginTop: '10%', fontSize: '1.5vw', color: 'white', fontWeight: 'bold'}}>
                Made by <a style={{color: 'white', textDecoration: 'none'}} target="_blank" href="https://github.com/atpngo">Andy Ngo</a>
            </p>
            </Stack>
        </div>
    );
}

export default Authenticate;