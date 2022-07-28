import axios from "axios";
import { Howl } from "howler";
import React, { useEffect, useState } from "react";

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


    return(
        <div>
            <button onClick={doThing}>Click me </button>
            <button onClick={playSong}>1</button>
            <button onClick={playSong}>2</button>
            <button onClick={playSong}>3</button>
        </div>

    )
}

export default Test;