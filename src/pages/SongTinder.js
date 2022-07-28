import React, { useEffect, useState } from "react";
import axios from "axios";
import Song from "../components/Song";
import { useNavigate } from "react-router-dom";

function SongTinder() 
{
    const [token, setToken] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [id, setId] = useState(null);
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
        if (!localStorage.getItem("playlistId"))
        {
            navigate("/create_playlist");
        }
        else if (localStorage.getItem("accessToken"))
        {
            getSongs();
        }
        console.log("fetching songs...");
    }, []);

    useEffect(() => {
        console.log("heyyyy man");
        // document.getElementsByClassName("b8")[0].click();

    }, [index])
    const getSongs = () =>
    {
        // 
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
                    let bads = [];
                    for (const [index, item] of newres.data.tracks.entries())
                    {
                        if (!item.preview_url)
                        {
                            console.log(`${item.name} did not have a preview url (index: ${index})`);
                            bads.push(item.id);
                        }
                    }
                    
                    if (bads.length == 0)
                    {
                        console.log("WOOOO");
                    }
                    else
                    {
                        let id = bads.join("%2C");
                        console.log(id);
                    }
                    
                    let formattedData = res.data.tracks.map(input => { 
                        return {
                            'title':input.name,
                            'artist':(input.artists.map((artist, key) => artist.name)).join(', '),
                            'player':"https://open.spotify.com/embed/track/" + input.id,
                            'url':input.preview_url,
                            'uri':input.uri,
                        }
                    });
                    // console.log(formattedData);
                    setData(formattedData);
        
                    setLoading(false);
                    
                })
             
        })
    }

    const likeCurrentSong = () =>
    {
        setSongs(songs.concat(data[index]));
        setIndex(index+1);
        setLoading(true);
        spotify.post('playlists/' + localStorage.getItem("playlistId") + '/tracks', 
            {
                uris:[data[index].uri]
            }
        )
        .then(res => {
            console.log(res);
            setLoading(false);
        })

    }

    const dislikeCurrentSong = () =>
    {
        setIndex(index+1);
        
    }
    
    const debug = () =>
    {
        console.log(songs);
    }

    if (loading)
    {
        return <div>Loading...</div>;
    }

    return(
        // check if playlist id is in localstorage
        <div>
            <Song title={data[index].title} artist={data[index].artist} url={data[index].player}/>
            <button onClick={likeCurrentSong}>Like It</button>
            <button onClick={dislikeCurrentSong}>Not a Fan</button>
            <button onClick={debug}>Debug</button>
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