import { AiOutlineClose } from "react-icons/ai"
import { AiTwotoneHeart } from "react-icons/ai"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { Howl } from 'howler';
import axios from "axios";
import Loading from "../components/Loading"
import { useNavigate } from "react-router-dom";

export default function Matcher()
{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [howlers, setHowlers] = useState([]);

    const navigate = useNavigate();
    // like  -> automatically like in spotify history
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
        
    }, []);

    const getSongs = () =>
    {
        setIndex(0);
        setLoading(true);
        const queries = ['short_term', 'medium_term', 'long_term'];
        axios.all(queries.map(query => spotify.get('me/top/tracks?time_range=' + query + '&limit=5')))
        .then(res => {
            let seed = null;
            // most recent last so go backwards
            for (let i=res.length-1; i>=0; i--)
            {
                if (res[i].data.items.length === 5)
                {
                    seed = res[i].data.items.map(song => song.id);
                }
            }
            seed = seed.join(',');

        spotify.get("recommendations?limit=50&seed_tracks=" + seed, {
            headers : {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
        .then((res) => {
            let id = (res.data.tracks.map(track => track.id)).join("%2C");
            spotify.get("tracks?market=US&ids=" + id)
                .then(newres => {
                    let fetchedSongs = [...newres.data.tracks]
                    let bads = [];
                    
                    if (bads.length == 0)
                    {
                    }
                    else
                    {
                        let id = bads.join(",");
                        
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
                            'spotify':input.external_urls.spotify,
                            'id':input.id
                        }
                    });
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
                    songSources[0].play();
                    setLoading(false);
                    
                })
            
        })
    })

    }

    const goNext = () =>
    {
        setIndex(index+1);
        // stop current playing song and play the next one
        howlers[index].stop();
        howlers[index+1].play();
        // 
        if (index+1 == data.length)
        {
            getSongs();
        }
    }

    const likeSong = () => {
        // add to liked songs on spotify
        console.log("i like this song " +  data[index].id)
        spotify.put('me/tracks?ids=3MOECVkNshqHYTPt5DZcdN')
    }  


    if (loading)
    {
        return <Loading/>
    }


    return (
        <div className="w-full h-screen bg-pink-400 flex flex-col items-center justify-center gap-20">
            {/* song data */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-center">
                <img src={data[index].image} className="w-[265px] h-[265px] lg:w-[400px] lg:h-[400px]"/>
                <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:justify-center lg: gap-4 text-white font-main text-[20px] lg:text-[40px] lg:max-w-[650px] max-w-[300px]">
                    <p className="font-bold">{data[index].title}</p>
                    <p className="">{data[index].artist}</p>
                </div>
            </div>
            {/* buttons */}
            <div className="flex gap-12 lg:gap-[300px]">
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => goNext()}>
                    <AiOutlineClose className="text-[90px] lg:text-[150px] text-[#AA226D]"/>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => likeSong()}>
                    <AiTwotoneHeart className="text-[90px] lg:text-[150px] text-[#AA226D]"/>
                </motion.div>
            </div>
        </div>
    )
}