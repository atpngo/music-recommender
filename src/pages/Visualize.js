import React, { useEffect, useState } from "react";
import axios from "axios";
import SongTable from "../components/SongTable";
import ReactApexChart from "react-apexcharts";



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
    const [audioFeat, setAudioFeat] = useState(null);

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });


    const constructHistogram = (category, data) => {
        let formattedData = new Array(10).fill(0);
        for (const val of data)
        {
            switch (true)
            {
                case val<=0.1:
                    formattedData[0]++;
                    break;
                case val<=0.2:
                    formattedData[1]++;
                    break;
                case val<=0.3:
                    formattedData[2]++;
                    break;
                case val<=0.4:
                    formattedData[3]++;
                    break;
                case val<=0.5:
                    formattedData[4]++;
                    break;
                case val<=0.6:
                    formattedData[5]++;
                    break;
                case val<=0.7:
                    formattedData[6]++;
                    break;
                case val<=0.8:
                    formattedData[7]++;
                    break;
                case val<=0.9:
                    formattedData[8]++;
                    break;
                case val<=1.0:
                    formattedData[9]++;
                    break;
            }
        }
        let histogram = {
            labels: ['0.0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1.0'],
            datasets: [{
                data: formattedData,
                label: 'Songs',
                backgroundColor: 'rgba(30, 215, 96, 0.5)',
            }]
        }
        return histogram;
    }


    useEffect(() => {
        // fetch data and then visualize 
        if (term)
        {
            spotify.get('me/top/tracks?time_range=' + term + '&limit=50')
            .then(
                res => {
                    setSongs(res.data.items);
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
                                    tmp[category] = {};
                                    tmp[category].options = {
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: [category.charAt(0).toUpperCase() + category.substring(1), descriptions[category]]
                                            },
                                        }
                                    };
                                    tmp[category].data = constructHistogram(category, audio_features.map((val, key) => val[category]));

                                    return tmp;
                                })
                            }
    
                            setLoading(false);
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
        console.log(data);
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

    // customizing chart
    // https://apexcharts.com/docs/options/plotoptions/bar/
    const apexOptions = {
        colors: ['#EF429F'],
        chart: {
            // background: '#d5b1cc', // bot
            // background: '#c8bfda', // mid
            background: '#b7d0ea', // top
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            height: 350,
            type: 'area',
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories:  ['0.0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5', '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1.0'],
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            show: false
        }
    }

    // this is where the data goes
    const apexSeries = [{
        name: 'Songs',
        data: [0,0,0,1,4,11,15,12,6,1] 
    }]

    return (
        <div>
            {term} <br/>
            {songs && <SongTable songs={songs} audioData={audioFeat}/>}

            <button onClick={selectTerm}>Short Term</button>
            <button onClick={selectTerm}>Medium Term</button>
            <button onClick={selectTerm}>Long Term</button>
            {/* {song && songs.map()} */}
            <ReactApexChart options={apexOptions} series={apexSeries} type="area" height={350}/>
            <button onClick={doThis}>Click me</button>
        </div>
    )
}

export default Visualize;