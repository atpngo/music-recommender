import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Stack, Paper, Dialog} from '@mui/material';
import { Howl } from 'howler';
import CurrentSong from '../components/CurrentSong';
import CartPopup from "../components/CartPopup";
import Loading from "../components/Loading";
import '../style/RoundButton.css';
import x from '../media/x.png';
import heart from '../media/heart.png';


const CartButton = (props) =>
{
    return(
        <div onClick={props.onClick} class="round-button">
            <div class="cart-button">
                <a class="round-button">{props.children}</a>
            </div>
        </div>
    );
}

const HeartButton = (props) => 
{
    return(
        <div onClick={props.onClick} class="round-button">
            <div class="heart-button">
                <img draggable="false" class="x" src={heart}></img>
            </div>
        </div>
    );
}

const NoButton = (props) => 
{
    return(
        <div onClick={props.onClick} class="round-button">
            <div class="no-button">
                <img draggable="false" class="x" src={x}></img>
            </div>
        </div>
    );
}

function SongTinder() 
{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [howlers, setHowlers] = useState([]);
    const [open, setOpen] = useState(false);
    const [songs, setSongs] = useState([]);

    const navigate = useNavigate();

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });


    useEffect(() => {
        if (localStorage.getItem("accessToken"))
        {
            getSongs();
        }
        else
        {
            navigate("/");
        }
        console.log("fetching songs...");
    }, []);


    const getSongs = () =>
    {
        setSongs(JSON.parse(localStorage.getItem("savedSongs")));
        setIndex(0);
        setLoading(true);
        const songs = '3PeSchiOZRgnnmAFrgDw4v,2HUoHvLUQlh2FO1kaIjkpN,7CQGybO25VSUNwY2hS7n6J,3XOAVwEjXprqsWRH7u93ae,3jIkw3Q7Lgl71fJdFnr1hf';

        spotify.get("recommendations?limit=50&seed_tracks=" + songs, {
            headers : {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
        .then((res) => {
            console.log(res.data.tracks);
            let id = (res.data.tracks.map(track => track.id)).join("%2C");
            console.log(id);
            for (const [index, item] of res.data.tracks.entries())
            {
                if (!item.preview_url)
                {
                    console.log(`${item.name} did not have a preview url (index: ${index})`);
                }
            }
            console.log('----------------------');
            spotify.get("tracks?market=US&ids=" + id)
                .then(newres => {
                    let fetchedSongs = [...newres.data.tracks]
                    let bads = [];
                    for (const [index, item] of newres.data.tracks.entries())
                    {
                        if (!item.preview_url)
                        {
                            console.log(`${item.name} did not have a preview url (index: ${index})`);
                            bads.push(index);
                        }
                    }
                    
                    if (bads.length == 0)
                    {
                        console.log("WOOOO");
                    }
                    else
                    {
                        let id = bads.join(",");
                        console.log(id);
                        // remove from data array
                        // for each "bad index", remove the value at that index from the array
                        for (const val of bads.reverse())
                        {
                            fetchedSongs.splice(val, 1);
                        }

                    }
                    
                    let formattedData = fetchedSongs.map(input => { 
                        return {
                            'title':input.name,
                            'artist':(input.artists.map((artist, key) => artist.name)).join(', '),
                            'player':"https://open.spotify.com/embed/track/" + input.id,
                            'image': input.album.images[0].url,
                            'url':input.preview_url,
                            'uri':input.uri,
                        }
                    });
                    console.log(formattedData);
                    setData(formattedData);
                    // set up howlers
                    let songSources = formattedData.map(song => {
                        return new Howl({
                            src: song.url,
                            html5: true,
                            volume: 0.05,
                            loop: true
                        })
                    });
                    setHowlers(songSources);
                    // play song?
                    console.log('starting song...');
                    songSources[0].play();
                    console.log('played song...');
                    setLoading(false);
                    
                })
             
        })
    }

    const likeCurrentSong = () =>
    {
        let tmpStorage = JSON.parse(localStorage.getItem("savedSongs"));
        tmpStorage.push(data[index]);
        localStorage.setItem("savedSongs", JSON.stringify(tmpStorage));
        // setLoading(true);
        // spotify.post('playlists/' + localStorage.getItem("playlistId") + '/tracks', 
        //     {
        //         uris:[data[index].uri]
        //     }
        // )
        // .then(res => {
        //     console.log(res);
        //     setLoading(false);
        // })
        setSongs(tmpStorage);
        goNext();
    }

    const dislikeCurrentSong = () =>
    {
        goNext();        
    }

    const goNext = () =>
    {
        setIndex(index+1);
        // stop current playing song and play the next one
        howlers[index].stop();
        howlers[index+1].play();
        // console.log(index);
        if (index+1 == data.length)
        {
            getSongs();
        }
    }
    
    const debug = () =>
    {
        console.log(howlers);
    }

    if (loading)
    {
        return <Loading/>;
    }

    const openCart = () =>
    {
        setOpen(true);
    }

    const handleClose = () =>
    {
        setOpen(false);
    }

    const Spacer = (props) =>
    {
        return <div style={{marginInline: props.space}}/>
    }

    return(
        // check if playlist id is in localstorage
        <div style={{height: '92vh', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <CartPopup open={open} onClose={handleClose} songs={songs}/>

            
            <CurrentSong song={data[index]}>
                    <Stack direction="row" sx={{marginTop: '3vh', display: 'flex', justifyContent: 'center'}}>
                        <NoButton onClick={dislikeCurrentSong}/>

                        {/* Distance between buttons */}
                        <Spacer space="2vw"/>
                        <CartButton onClick={openCart}>
                            {JSON.parse(localStorage.getItem("savedSongs")).length}
                        </CartButton>
                        <Spacer space="2vw"/>

                        {/* <YesButton aria-label="yes" sx={{backgroundColor: '#72AF5C', color: 'white', width: '125px', height: '125px'}}> */}
                        <HeartButton onClick={likeCurrentSong}/>

                    </Stack>
            </CurrentSong>


        </div>
    ); 
}

export default SongTinder;

// flow ->
// users authenticate first thign
// select what they wanna do (visualize their stats or whatever, OR make a playlist)
// make a playlist title and description 
// either: generate a new playlist or listen and create their own
// if latter, start adding songs based on their CURRENT top 5 songs, generate 100 for them to go through
// if they find 5 they like, use those to generate more