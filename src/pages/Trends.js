import React, { useEffect, useState } from "react";
import axios from "axios";
import TileStack from "../components/TileStack";
import Profile from "../components/Profile";
import {constructHistogram} from '../util/Functions';
import PaperChart from "../components/PaperChart";
import { Stack, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Loading from "../components/Loading";
import useWindowDimensions from "../util/Window";
import { useNavigate } from "react-router-dom";

function Trends()
{
    const histogramCategories = ['danceability', 'energy', 'valence'];
    const descriptions = {
        'danceability' : 'How suitable for dancing based on tempo, rhythm stability, beat strength, and overall regularity',
        'energy' : 'Perceptual measure of intesity and activity',
        'valence' : 'Musical positiveness. High valence tracks sound positive (happy, cheerful, euphoric), while low valence tracks sound negative (sad, depressed, angry)'
    }


    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState('long_term');
    const [songs, setSongs] = useState(null);
    const [artists, setArtists] = useState(null);
    const {width, height} = useWindowDimensions();
    const navigate = useNavigate();

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
            // get id
            spotify.get('me').then(res => {
                localStorage.setItem("userID", res.data.id);
                localStorage.setItem("userImage", res.data.images[0].url);
                localStorage.setItem("userName", res.data.display_name);
            
            
                spotify.get('me/top/tracks?time_range=' + term + '&limit=50')
                .then(
                    res => {
                        
                        setSongs(res.data.items.map((item, key) => {
                            return {
                                image: item.album.images[1].url,
                                title: item.name,
                                artists: item.artists.map((artist, key) => artist.name).join(', '),
                                index: key+1
                            }
                        }));
                        // 
                        let trackIds = res.data.items.map((item, key) => item.id).join(',');
                        spotify.get('/audio-features?ids=' + trackIds)
                        .then(
                            res => {
                                let audio_features = res.data.audio_features;
                                // 
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
                )
            });
        }
        else
        {
            setLoading(false);
        }
    }, [term, setTerm]);

    if (loading)
    {
        return <Loading/>
    }

    const doThis = () =>
    {
        // 
        
    }

    const selectTerm = (e) => {
        let choice = e.target.id;
        switch (choice)
        {
            case 'short':
                setTerm('short_term');
                break;
            case 'medium':
                setTerm('medium_term');
                break;
            case 'long':
                setTerm('long_term');
                break;
        }
    }

    const CustomButton = styled(Button)(({theme}) => ({
        color: 'white',
        backgroundColor: '#EF429F',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'none',
        fontSize: 'large',
        '&:hover': {
            backgroundColor: '#d9388f',
        },
        width: '80%',
        
    }))

    const spacer = {
        marginTop: '2vh'
    }

    const goToSongs = () =>
    {
        navigate('/songs');
    }

    if (width < height)
    {
        return (
            <div style={{height: '80vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <p>Mobile Version is a Work in Progress!</p>
                <div style={{flexBasis: '100%', height: '0'}}></div>
                <button onClick={goToSongs}>Go to Songs</button>
            </div>
        );
    }

    return (
        <div style={{height: '90vh', display: 'flex', alignItems: 'center', paddingTop: '1vw', paddingLeft: '1.5vw', paddingRight: '1vw'}}>
            
            <Stack direction="row">
                {/* Icon and Buttons */}
                <Stack direction="column" sx={{marginRight: "2vw", display: "flex", alignContent: "center", justifyContent: "center"}}>
                    <Profile/>
                    {/* Buttons */}
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: '10vh'}}>
                        <CustomButton onClick={selectTerm} id="short" variant="contained">Past Month</CustomButton>
                        <div style={spacer}/>
                        <CustomButton onClick={selectTerm} id="medium" variant="contained">Past 6 Months</CustomButton>
                        <div style={spacer}/>
                        <CustomButton onClick={selectTerm} id="long" variant="contained">All Time</CustomButton>
                        <div style={spacer}/>
                        <br/>
                    </div>
                </Stack>

                {/* Top Items */}
                <TileStack title="Top 50 Songs" type="songs" data={songs}/>
                <div style={{marginLeft:'1vw'}}/>
                <TileStack title="Top 50 Artists" type="artists" data={artists}/>

                {/* Charts */} 
                 <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    {histogramCategories.map((category, key) => { return <PaperChart data={data[category]} title={category.charAt(0).toUpperCase() + category.slice(1)} />})}
                 </div>
            </Stack>
        </div>
    )
}

export default Trends;