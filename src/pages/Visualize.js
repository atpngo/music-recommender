import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "../components/Chart";
import TileStack from "../components/TileStack";

import {constructHistogram} from '../util/Functions';
import PaperChart from "../components/PaperChart";
import { Stack } from "@mui/material";

function Visualize()
{
    const histogramCategories = ['danceability', 'energy', 'valence'];
    const descriptions = {
        'danceability' : 'How suitable for dancing based on tempo, rhythm stability, beat strength, and overall regularity',
        'energy' : 'Perceptual measure of intesity and activity',
        'valence' : 'Musical positiveness. High valence tracks sound positive (happy, cheerful, euphoric), while low valence tracks sound negative (sad, depressed, angry)'
    }


    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState('short_term');
    const [songs, setSongs] = useState(null);
    const [artists, setArtists] = useState(null);
    const [audioFeat, setAudioFeat] = useState(null);

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });


    useEffect(() => {
        // fetch data and then visualize 
        if (term)
        {
            spotify.get('me/top/tracks?time_range=' + term + '&limit=50')
            .then(
                res => {
                    // console.log(res.data.items);
                    setSongs(res.data.items.map((item, key) => {
                        return {
                            image: item.album.images[1].url,
                            title: item.name,
                            artists: item.artists.map((artist, key) => artist.name).join(', '),
                            index: key+1
                        }
                    }));
                    // console.log(res.data.items.map(item => item.album.images[1].url));
                    let trackIds = res.data.items.map((item, key) => item.id).join(',');
                    spotify.get('/audio-features?ids=' + trackIds)
                    .then(
                        res => {
                            let audio_features = res.data.audio_features;
                            // console.log(audio_features);
                            setAudioFeat(audio_features);
                            // handle histograms
                            for (const category of histogramCategories)
                            {
                                setData(prevState => {
                                    let tmp = Object.assign({}, prevState);
                                    tmp[category] = constructHistogram(audio_features.map((val, key) => val[category]));

                                    return tmp;
                                })
                            }
                            // get artists
                            spotify.get('me/top/artists?time_range='+term+'&limit=50')
                            .then(res => 
                                {
                                    setArtists(res.data.items.map((artist, key) => {
                                        return {
                                            image: artist.images[1].url,
                                            title: artist.name,
                                            artists: artist.followers.total + ' Followers',
                                            index: key+1
                                        }
                                    }));
                                    
                                    setLoading(false);

                                }
                            )
                        }
                    )
                }
            );
        }
        else
        {
            setLoading(false);
        }
    }, [term, setTerm]);

    if (loading)
    {
        return <div>Loading...</div>
    }

    const doThis = () =>
    {
        // console.log(songs);
        console.log(songs);
    }

    const selectTerm = (e) => {
        let choice = e.target.innerText;
        switch (choice)
        {
            case 'Short Term':
                setTerm('short_term');
                break;
            case 'Medium Term':
                setTerm('medium_term');
                break;
            case 'Long Term':
                setTerm('long_term');
                break;
        }
    }

    return (
        <div>
            <button onClick={doThis}>Debug</button>
            <button onClick={selectTerm}>Short Term</button>
            <button onClick={selectTerm}>Medium Term</button>
            <button onClick={selectTerm}>Long Term</button>

            {/* Song Tiles */}
            <Stack direction="row">
                <TileStack title="Top 50 Songs" type="songs" data={songs}/>
                <TileStack title="Top 50 Artists" type="artists" data={artists}/>
                {/* Charts */} 
                {/* {term && histogramCategories.map((category, index) => { return <Chart bgcolor='#b7d0ea' data={data[category]} labels={['0.0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1.0']} /> })} */}
                 <Stack direction="column">
                    {histogramCategories.map((category, key) => {
                        return <PaperChart data={data[category]} title={category.charAt(0).toUpperCase() + category.slice(1)} />
                    })}
                 </Stack>
            </Stack>
        </div>
    )
}

export default Visualize;