import axios from "axios";
import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import CurrentSong from "../components/CurrentSong";
import Slide from '@mui/material/Slide';
import {Dialog, Stack, Paper, List} from '@mui/material';
import AlbumCover from "../components/AlbumCover";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Test()
{

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    const [current, setCurrent] = useState(null);

    const [songs, setSongs] = useState(null);

    const urls = [
        {sound: "https://p.scdn.co/mp3-preview/ff4227b0db468a2ee6c07a8fac221b74f8cd2c20?cid=5500266ebaca49e8a3bc68c6ca66bc49", label: "Song 1"},
        {sound: "https://p.scdn.co/mp3-preview/a3eab0f06a8fa358487516e51b72934148081199?cid=5500266ebaca49e8a3bc68c6ca66bc49", label: "Song 2"},
        {sound: "https://p.scdn.co/mp3-preview/87681529f90c880abf5ead07c1d253c2769ddbc4?cid=5500266ebaca49e8a3bc68c6ca66bc49", label: "Song 3"},
    ]

    useEffect(() =>
    {
        setSongs(urls.map(url => {
            let audioUrl = url.sound;
            let title = url.label;
            return new Howl({
                src: audioUrl,
                html5: true,
                volume: 0.05,
            })
        }));
    }, []);

    const doThing = () =>
    {
        console.log(songs);
    }

    const playSong = (e) =>
    {
        if (current)
        {
            current.stop();
        }
        let index = parseInt(e.target.innerText)-1;
        setCurrent(songs[index]);
        songs[index].play();

    }

    const obj = {
        image: 'https://i.scdn.co/image/ab67616d00001e024f62175e66f71baafaade4b1',
        title: 'Her Song',
        artist: 'Kaylee Federmann',
    }
    return(
        <div>
            <Dialog maxWidth='xl' open={true} TransitionComponent={Transition} keepMounted PaperProps={{style: {borderRadius: 20, backgroundColor: '#E28BBA'}}}>
                <div style={{width: '75vw', height: '75vh', display: 'flex', padding: '30px'}}>
                    <Stack direction="row">
                        {/* contains songs */}
                        <Paper elevation={10} sx={{backgroundColor: 'rgb(255,255,255,0.25)', height: '90%', width: '50vw', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden', alignContent: 'flex-start', padding: '30px', paddingLeft: '0px', paddingRight: '0px', borderRadius: '20px'}}>
                        <Paper elevation={0} sx={{backgroundColor: 'rgb(255,255,255,0)', height: '90%', width: '50vw', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'auto', alignContent: 'flex-start', justifyContent: 'center', padding: '30px', borderRadius: '20px'}}>
                            {JSON.parse(localStorage.getItem("savedSongs")).map((song) => {
                                // return 
                                // need to make something that looks like this:
                                // <Avatar> <RemoveBtn/> </Avatar>
                                // remove btn passed as a child component and used to remove the song from the list
                                return <AlbumCover image={song.image}>
                                    {/* button here later */}
                                </AlbumCover>
                            })}
                        </Paper>
                        </Paper>
                        {/* contains options */}
                    </Stack>
                    
                </div>

            </Dialog>
        </div>

    )
}

export default Test;