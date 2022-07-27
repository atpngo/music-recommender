import axios from "axios";
import React, { useEffect } from "react";

function Test()
{

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    let audioElement = document.querySelector("audio");
    let track = audioCtx.createMediaElementSource(audioElement);

    useEffect(() =>
    {
        audioElement = document.querySelector("audio");
        track = audioCtx.createMediaElementSource(audioElement);
    }, []);

    const doThing = () =>
    {
        audioCtx.play();
    }
    return(
        <div>
            <button onClick={doThing}>Click me </button>
            <audio src="https://p.scdn.co/mp3-preview/ff4227b0db468a2ee6c07a8fac221b74f8cd2c20?cid=5500266ebaca49e8a3bc68c6ca66bc49"></audio>
        </div>

    )
}

export default Test;