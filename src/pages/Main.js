// This is redesigned Trends page

import SquareImage from "../components/SquareImage";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useWindowDimensions from "../util/Window";
import { useNavigate } from "react-router-dom";
import {constructHistogram} from '../util/Functions';
import Loading from "../components/Loading";
import Podium from "../components/Podium";
import SongSlab from "../components/SongSlab";
import AdventureSection from "../components/AdventureSection";
import ReactApexChart from "react-apexcharts";
import { motion, AnimatePresence, useInView } from "framer-motion"
import AnimationReveal from "../components/AnimationReveal";


function Main()
{
    const getRandom = (arr) => {
        return arr[Math.floor(Math.random()*arr.length)]
    }
    const histogramCategories = ['danceability', 'energy', 'valence'];

    const [categorySongs, setCategorySongs] = useState({
        'danceability': {'id': null, 'value': 0, 'average': 0},
        'energy': {'id': null, 'value': 0,'average': 0},
        'valence': {'id': null, 'value': 0, 'average': 0}
    })
    const [latestSong, setLatestSong] = useState(null);
    const [topGenres, setTopGenres] = useState([])
    const [genres, setGenres] = useState({})
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState('long_term');
    const [songs, setSongs] = useState(null);
    const [artists, setArtists] = useState(null);
    const {width, height} = useWindowDimensions();
    const [shortWorks, setShort] = useState(false);
    const [mediumWorks, setMedium] = useState(false);
    const [longWorks, setLong] = useState(false);
    const [id2SongMap, setID2SongMap] = useState({});
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("month")
    const [options, setOptions] = useState([]);
    const [valence, setValence] = useState([]);
    const [danceability, setDanceability] = useState([]);
    const [energy, setEnergy] = useState([]);

    const translator = {
        "month": "short_term",
        "half year": "medium_term",
        "all time": "long_term",
    }

    const reverseTranslator = {
        "short_term": "month",
        "medium_term": "half year",
        "long_term": "all time",
    }

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    const terms = ['short_term', 'medium_term', 'long_term'];

    // animations
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true })

    const [setInView, inView] = useState(false)

    useEffect(() => {
        // get each possible "top" data from spotify
        setLoading(true)
        axios.all(terms.map(term => spotify.get('me/top/tracks?time_range=' + term + '&limit=1')))
        .then(res => {
            console.log(res);
        let localTerm;
        for (let i=2; i>=0; i--)
        {
            // if any of them have a value greater than 0, it means data exists and can be used
            if (res[i].data.items.length > 0)
            {
                console.log(i);
                switch (i)
                {
                    case 0:
                        setShort(true);
                        setOptions(prev => {
                            if (!prev.includes('month')) return [...prev, 'month']
                            else return [...prev]
                        })
                        break;
                    case 1:
                        setMedium(true);
                        setOptions(prev => {
                            if (!prev.includes('half year')) return [...prev, 'half year']
                            else return [...prev]
                        })
                        break;
                    default:
                        setLong(true);
                        setOptions(prev => {
                            if (!prev.includes('all time')) return [...prev, 'all time']
                            else return [...prev]
                        })
                        break;
                }
            }
        }
        // use most recent term
        localTerm = translator[selected];
        if (!localTerm)
        {
            console.log("something bad happened")
            // set some flag here to display an error
            return
        }
        else
        {

        }



        // fetch data and then visualize 
        if (localTerm)
        {
            // get id
            spotify.get('me').then(res => {
                localStorage.setItem("userID", res.data.id);
                if (res.data.images.length > 0)
                    localStorage.setItem("userImage", res.data.images[res.data.images.length-1].url);
                else
                    localStorage.setItem("userImage", 'https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg');
                localStorage.setItem("userName", res.data.display_name);

                if (height > width)
                {
                    // navigate('/songs')
                }
            
            
                spotify.get('me/top/tracks?time_range=' + localTerm + '&limit=50')
                .then(
                    res => {
                        setID2SongMap(prev => {
                            let t = Object.assign({}, prev);
                            res.data.items.forEach((item, idx) => {
                                t[item["id"]] = {
                                    title: item.name,
                                    artists: item.artists.map((artist, idx) => artist.name).join(", "),
                                    image: item.album.images[1].url
                                };
                            })
                            return t;
                        })
                        setSongs(res.data.items.map((item, key) => {
                            return {
                                image: item.album.images[1].url,
                                title: item.name,
                                artists: item.artists.map((artist, key) => artist.name).join(', '),
                                url: item.external_urls.spotify,
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
                                        tmp[category] = constructHistogram(audio_features.map((val, key) => {
                                            return val[category];
                                        }));
                                        return tmp;
                                    })
                                }
                                // get maxes
                                for (const category of histogramCategories)
                                {
                                    // find best
                                    let bestVal = 0;
                                    let bestSong = null;
                                    let total = 0;
                                    let count = res.data.audio_features.length;
                                    res.data.audio_features.forEach((song, idx) => {
                                        total += song[category]
                                        if (song[category] > bestVal)
                                        {
                                            bestVal = song[category];
                                            bestSong = song["id"];
                                        }
                                    })
                                    setCategorySongs((prev) => {
                                        let t = Object.assign({}, prev);
                                        t[category]["id"] = bestSong;
                                        t[category]["value"] = bestVal;
                                        t[category]["average"] = total/count;
                                        return t;
                                    })
                                }

                                // sort songs by valence 
                                let copy = [...res.data.audio_features];
                                let sortedValence = copy.sort((a, b) => {
                                    if (a["valence"] > b["valence"]) return -1
                                    if (a["valence"] < b["valence"]) return 1
                                    return 0
                                })
                                copy = [...res.data.audio_features];
                                let sortedEnergy = copy.sort((a, b) => {
                                    if (a["energy"] > b["energy"]) return -1
                                    if (a["energy"] < b["energy"]) return 1
                                    return 0
                                })
                                copy = [...res.data.audio_features];
                                let sortedDanceability = copy.sort((a, b) => {
                                    if (a["danceability"] > b["danceability"]) return -1
                                    if (a["danceability"] < b["danceability"]) return 1
                                    return 0
                                })
                                setValence(sortedValence)
                                setDanceability(sortedDanceability)
                                setEnergy(sortedEnergy)

                                // get artists
                                spotify.get('me/top/artists?time_range='+localTerm+'&limit=50')
                                .then(res => 
                                    {
                                        setArtists(res.data.items.map((artist, key) => {
                                            return {
                                                image: artist.images[1].url,
                                                title: artist.name,
                                                url: artist.external_urls.spotify,
                                                index: key+1
                                            }
                                        }));
                                        let genreSet = {}
                                        res.data.items.forEach((artist, idx) => {
                                            if (artist["genres"])
                                            {
                                                artist["genres"].forEach((genre, i) => {
                                                    if (!(genre in genreSet))
                                                    {
                                                        genreSet[genre] = 0
                                                    }
                                                    genreSet[genre] += 1
                                                })   
                                            }
                                        })
                                        // sort them
                                        const genreList = Object.entries(genreSet).sort((a,b) => {return b[1] - a[1] })
                                        setTopGenres(genreList)
                                        setGenres(genreSet)
                                        let topArtist = res.data.items[0]

                                        // get top artist's latest track
                                        spotify.get('artists/' + topArtist.id + '/albums?include_groups=single,appears_on&offset=0&limit=1&market=US&locale=en-US,en;q=0.9')
                                        .then(res => 
                                            {
                                                setLatestSong(res.data.items[0].id)
                                                setLoading(false);

                                            }
                                        )
                                        

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
    });

    }, [term, setTerm]);

    if (loading)
    {
        return (
            <AnimatePresence>
                <motion.div>
                    <Loading/>
                </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <div className="flex flex-col">
            {/* Intro */}
            <motion.div ref={ref} className={`bg-gradient-to-b from-[#F5CFCF] to-[#F5CFCF] from-10% to-90% z-1000 h-screen flex flex-col items-center`} >
                <motion.div 
                    className="flex lg:flex-row flex-col items-center pt-[100px] lg:pt-0 gap gap-[60px] lg:justify-center h-full p-4 lg:gap-[120px] lg:max-w-[1600px]"
                    variants={{
                        hidden: {opacity: 0, y: 75},
                        visible: {opacity: 1, y: 0}
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                        <div className="flex flex-col lg:py-[100px] lg:gap-12 order-last lg:order-first">
                            <div className="flex flex-col">
                                <p className="font-main font-bold lg:text-[75px] text-[30px] lg:leading-[100px] leading-[30px] pb-[10px]">Howdy,</p>
                                <p className="font-main font-bold lg:text-[75px] text-[30px] leading-[30px] pb-[10px]">{localStorage.getItem("userName")}!</p>
                            </div>
                            <div className="flex flex-col lg:gap-4 pt-[10px]">
                                <p className="font-alt lg:text-[25px] text-[22px] lg:leading-[10px]">Let's take a look at your listening </p>
                                <div className="flex lg:gap-4 gap-2 items-center">
                                    <p className="font-alt lg:text-[25px] text-[22px]">history in the past: </p>
                                        {/* dropdown */}
                                        <div className="relative inline-block text-left">
                                            <div className="flex">
                                                <button 
                                                    type="button" 
                                                    className="flex items-center lg:text-[22px] text-[18px] w-[140px] lg:w-[180px] justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                                                    id="menu-button" 
                                                    aria-expanded="true" 
                                                    aria-haspopup="true"
                                                    onClick={() => {setOpen(!open)}}
                                                >
                                                {selected}
                                                <svg className="-mr-1 h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                                </svg>
                                                </button>
                                            </div>


                                            <AnimatePresence>
                                                {open && <motion.div
                                                    // initial={{opacity: 0}}
                                                    // animate={{opacity: 1}}
                                                    // exit={{opacity: 0}}
                                                    initial={{scale: 0}}
                                                    animate={{scale: 1}}
                                                    exit={{scale: 0}}
                                                    className="absolute right-0 z-10 mt-2 w-[175px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="menu-button"
                                                    tabindex="-1"
                                                >
                                                    <div className="py-1" role="none">
                                                        {options.map((option, idx) => {
                                                            return <a className="text-gray-700 block px-4 py-2 text-sm hover:bg-pink-50 cursor-pointer" key={idx} onClick={() => {setSelected(option); setOpen(false); setTerm(translator[option])}}>{option}</a>
                                                        })}
                                                    </div>
                                                </motion.div>}
                                            </AnimatePresence>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <img 
                            src={localStorage.getItem("userImage")}
                            className="rounded-full lg:w-[400px] lg:h-[400px] w-[260px] h-[260px] object-cover shadow-xl order-first lg:order-last"
                        />
                </motion.div>
            </motion.div>

            {/* Top Artists */}
            <div className={`bg-gradient-to-b from-[#F5CFCF] to-[#F1E3BE] from-0% to-90% z-1000 flex flex-col items-center`}>
                <div className="flex flex-col items-center gap-14 lg:min-w-[900px] lg:max-w-[1600px] min-w-[300px] md:max-w-[800px] max-w-[300px]">
                    <div className="flex items-end w-full">
                        <AnimationReveal>
                            <div className="flex flex-col">
                                <p className="font-main font-bold text-[#B13812] lg:text-[50px] text-[30px] overflow-auto lg:leading-normal leading-[35px] overflow-hidden">introducing your dream team!</p>
                                <p className="font-main lg:text-[25px] text-[14px]">Here are some artists that you just couldn't stop listening to</p>
                            </div>
                        </AnimationReveal>
                    </div>

                    {/* big numero uno */}
                    <AnimationReveal>
                        <div className="flex lg:flex-row flex-col lg:gap-[100px] md:gap-[100px] items-start w-full justify-center"
                            // style={{
                            //     gap: `${width/100}px`
                            // }}
                        >
                            <div className="flex flex-col lg:max-w-[650px] lg:min-w-[200px] gap-11">
                                <AnimationReveal left>
                                    <div className="flex flex-col lg:gap-4 gap-4">
                                        <p className="font-alt lg:text-[18px] text-[12px]">Seems like you're a pretty big fan of</p>
                                        <p className="font-main font-bold lg:text-[100px] lg:leading-[90px] text-[60px] leading-[50px] text-[#286CBA]">{artists[0].title}</p>
                                        <p className="font-alt lg:text-[30px]">They're your <b>#1</b> most listened to artist based on your listening history!</p>
                                    </div>
                                </AnimationReveal>
                                <AnimationReveal>
                                    <div className="lg:hidden flex justify-center">
                                        <SquareImage
                                            src={artists[0].image}
                                            size="300px"
                                            color="#286CBA"
                                            box="12px"
                                            fontSize="20px"
                                            number="1"
                                        />
                                    </div>
                                </AnimationReveal>
                                <div className="flex flex-col gap-4">
                                    <p className="font-alt lg:text-[20px] text-[14px]">Did you get a chance to listen to their latest hits yet?</p>
                                    <iframe
                                        style={{borderRadius: "12px"}}
                                        src={`https://open.spotify.com/embed/album/${latestSong}?utm_source=generator`}
                                        width="100%"
                                        height="200"
                                        frameBorder="0"
                                        allowfullscreen=""
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"/>
                                </div>
                            </div>
                            <div className="lg:flex hidden">
                                <SquareImage
                                    src={artists[0].image}
                                    size={(width < 1350) ? ((width < 1050) ? "250px" : "300px") : "450px"}
                                    color="#286CBA"
                                    box="20px"
                                    fontSize="30px"
                                    number="1"
                                />
                            </div>
                        </div>
                    </AnimationReveal>
                    {/* other artists */}
                    <AnimationReveal>
                        <div className="flex lg:flex-row flex-col gap-4 lg:gap-20">
                            {artists && artists.slice(1, 5).map((artist, idx) => {
                                // get 2-5
                                    return (
                                        <div className="flex flex-col gap-4 items-center">
                                            <SquareImage
                                                key={idx}
                                                src={artist.image}
                                                size="212px"
                                                color="#286CBA"
                                                box="10px"
                                                fontSize="20px"
                                                number={idx+2}
                                            />
                                            <p className="font-alt font-bold">{artist.title}</p>
                                        </div>
                                    )
                            })}
                        </div>
                    </AnimationReveal>

                    {/* TODO: add playlists */}

                </div>
            </div>
            {/* music section */}
            <div className={`bg-gradient-to-b from-[#F1E3BE] to-[#BEF1DF] from-10% to-90% z-1000 flex flex-col items-center pt-[200px]`}>
                <div className="flex flex-col items-center gap-14 lg:min-w-[900px] lg:max-w-[1600px] min-w-[300px] md:max-w-[800px] max-w-[300px]"> 
                    <div className="flex items-start w-full">
                        <AnimationReveal left>
                            <div className="flex flex-col">
                                <p className="font-main font-bold text-[#0B9F2C] lg:text-[50px] text-[30px] overflow-auto lg:leading-normal leading-[35px] overflow-hidden">your musical hall of fame</p>
                            </div>
                        </AnimationReveal>
                    </div>
                    <div className="flex lg:flex-row flex-col items-center lg:gap-16 gap-8">
                        <AnimationReveal up>
                            <div className="flex flex-col lg:leading-[90px] max-w-[650px] w-full">
                                <p className="font-main lg:text-[25px] text-[12px]">The song you had stuck on repeat was</p>
                                <p className="font-main font-bold lg:text-[100px] text-[30px] text-[#286CBA]">{songs[0].title}</p>
                                <p className="font-main font-bold lg:text-[50px] text-[15px] text-[#80BBFF] lg:leading-[50px]">{songs[0].artists}</p>
                            </div>
                        </AnimationReveal>
                        <div>
                            <div className="lg:hidden">
                                <SquareImage
                                    src={songs[0].image}
                                    size="200px"
                                    color="#286CBA"
                                    box="10px"
                                    fontSize="30px"
                                    number="1"
                                />
                            </div>
                            <div className="lg:flex hidden">
                                <SquareImage
                                    src={songs[0].image}
                                    size="500px"
                                    color="#286CBA"
                                    box="20px"
                                    fontSize="30px"
                                    number="1"
                                />
                            </div>
                        </div>
                    </div>
                    {/* podium BIG SCREEN */}
                    <AnimationReveal up>
                        <div className="lg:flex hidden">
                            <div className="flex justify-end">
                                <Podium
                                    color="#3B74B7"
                                    width="340px"
                                    height="177px"
                                    number={2}
                                >
                                    <SongSlab
                                        title={songs[1].title}
                                        artist={songs[1].artists}
                                        image={songs[1].image}
                                        size={"80px"}
                                    />
                                </Podium>
                                <Podium
                                    color="#1E5390"
                                    width="340px"
                                    height="239px"
                                    number={1}
                                >
                                    <SongSlab
                                        title={songs[0].title}
                                        artist={songs[0].artists}
                                        image={songs[0].image}
                                        size={"80px"}
                                    />
                                </Podium>
                                <Podium
                                    color="#3B74B7"
                                    width="340px"
                                    height="146px"
                                    number={3}
                                >
                                    <SongSlab
                                        title={songs[2].title}
                                        artist={songs[2].artists}
                                        image={songs[2].image}
                                        size={"80px"}
                                    />
                                </Podium>
                            </div>
                        </div>
                    </AnimationReveal>
                    {/* end podium */}
                    {/* start rest of songs big */}
                    <AnimationReveal up>
                        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-[40px]">
                            {songs.slice(3, Math.min(songs.length-1, 8) + 3).map((song, idx) => {
                                    return (
                                        <div className="flex flex-col gap-4 items-center text-center">
                                            <SquareImage
                                                key={idx}
                                                src={song.image}
                                                size={"200px"}
                                                color={"#286CBA"}
                                                number={idx+1}
                                                box={"10px"}
                                                fontSize={"14px"}
                                            />
                                            <div className="flex flex-col items-center">
                                                <p className="font-alt font-bold text-lg leading-[20px]">{song.title}</p>
                                                <p className="font-alt text-lg">{song.artists}</p>
                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                    </AnimationReveal>
                    {/* rest of songs small */}
                    <AnimationReveal left>
                        <div className="lg:hidden max-w-[500px] gap-4 flex flex-col">
                            {songs.slice(1, 5).map((song, idx) => {
                                return (
                                    <div className="flex gap-4 items-center">
                                        <p className="font-alt font-bold text-[#286CBA] text-[30px]">{idx+2}</p>
                                        <SongSlab
                                            title={song.title}
                                            artist={song.artists.substring(0, Math.min(song.artists.length, 25)) + (song.artists.length > 25 ? "..." : "") }
                                            image={song.image}
                                            size={"90px"}
                                            // padding={"4px"}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </AnimationReveal>
                </div>
            </div>
            {/* end music section */}

            {/* trends section */}
            <div className={`bg-gradient-to-b from-[#BEF1DF] to-[#BED8F1] from-0% to-90% z-1000 flex flex-col items-center`}>
                <div className="flex flex-col items-center lg:min-w-[900px] lg:max-w-[1600px] min-w-[300px] md:max-w-[800px] max-w-[300px] pt-[200px]">

                <div className="flex justify-center w-full">
                    <AnimationReveal>
                        <div className="flex flex-col items-center">
                            <p className="font-main font-bold text-[#155CA0] lg:text-[50px] text-[30px] overflow-auto lg:leading-normal leading-[35px] overflow-hidden">your audio adventures</p>
                            <p className="font-main lg:text-[25px] text-[14px]">There's some notable patterns in the songs you like listening to</p>
                        </div>
                    </AnimationReveal>
                </div>
                        <div className="flex flex-col gap-[100px] pt-[100px] pb-10">
                            {/* valence level */}
                            <div>
                                <AnimationReveal left>
                                    <AdventureSection
                                        alignment={"start"}
                                        // title={(categorySongs["valence"]["average"] < 0.33) ? "sad bean" : (categorySongs["valence"]["average"] < 0.66) ? "if you're happy and you know it clap your hands" : "all sunshine and rainbows here"}
                                        title={"happiness"}
                                        description={"on average, your songs have a happiness level of"}
                                        value={categorySongs["valence"]["average"]}
                                        heading={"your go to mood booster was"}
                                        mainSong={id2SongMap[categorySongs["valence"]["id"]]}
                                        subSongs={valence.slice(1, 5).map((song, idx) => id2SongMap[song["id"]])}
                                        color={"#1598A0"}
                                        data={data["valence"]}
                                    />
                                </AnimationReveal>
                            </div>
                            {/* energy level */}
                            <div>
                                <AnimationReveal down>
                                    <AdventureSection
                                        alignment={"center"}
                                        // title={(categorySongs["energy"]["average"] < 0.33) ? "stay mellow my fellow" : (categorySongs["energy"]["average"] < 0.66) ? "LETS GO!" : "GET HYPE!"}
                                        title={"energy"}
                                        description={"on average, your songs have an energy level of"}
                                        value={categorySongs["energy"]["average"]}
                                        heading={"your go to hype song was"}
                                        mainSong={id2SongMap[categorySongs["energy"]["id"]]}
                                        subSongs={energy.slice(1, 5).map((song, idx) => id2SongMap[song["id"]])}
                                        color={"#A80000"}
                                        data={data["energy"]}
                                    />
                                </AnimationReveal>
                            </div>
                            {/* danceability level */}
                            <div>
                                <AnimationReveal right>
                                    <AdventureSection
                                        alignment={"end"}
                                        title={"danceability"}
                                        // title={(categorySongs["danceability"]["average"] < 0.33) ? "dance! but only sometimes" : (categorySongs["danceability"]["average"] < 0.66) ? "dance like nobody's watching!" : "get groovy!"}
                                        description={"on average, your songs have a danceability level of"}
                                        value={categorySongs["danceability"]["average"]}
                                        heading={"nothing gets you dancing like"}
                                        mainSong={id2SongMap[categorySongs["danceability"]["id"]]}
                                        subSongs={danceability.slice(1, 5).map((song, idx) => id2SongMap[song["id"]])}
                                        color={"#3E78E9"}
                                        data={data["danceability"]}
                                    />
                                </AnimationReveal>
                            </div>
                        </div>
                </div>
            </div>
            {/* end trends section */}

            {/* genre section */}
            <div className={`bg-gradient-to-b from-[#BED8F1] to-[#C8BEF1] from-0% to-90% z-1000 flex flex-col items-center pt-[100px] pb-[100px]`}>
                <div className="flex flex-col items-center gap-14 lg:min-w-[900px] lg:max-w-[1600px] min-w-[300px] md:max-w-[800px] max-w-[300px]">
                    <div className="flex items-end w-full">
                        <AnimationReveal>
                            <div className="flex flex-col">
                                <p className="font-main font-bold text-[#5B15A0] lg:text-[50px] text-[30px] overflow-auto lg:leading-normal leading-[35px] overflow-hidden">your genre gems</p>
                                <p className="font-main lg:text-[25px] text-[14px]">your top genres were <b className="text-[#5B15A0]">{topGenres[0][0]}</b>, <b className="text-[#5B15A0]">{topGenres[1][0]}</b>, and <b className="text-[#5B15A0]">{topGenres[2][0]}</b></p>
                            </div>
                        </AnimationReveal>
                    </div>

                    {/* chart */}
                    <div className="w-full">
                        <AnimationReveal>
                            <ReactApexChart
                                type={"pie"}
                                options={
                                    {
                                        // colors: ['hsl(271, 100%, 34%)', 'hsl(271, 100%, 44%)', 'hsl(271, 100%, 54%)', 'hsl(271, 100%, 64%)', 'hsl(271, 100%, 74%)', 'hsl(271, 100%, 84%)'],
                                        colors: topGenres.slice(0, 15).map((genre, idx) => {return `hsl(271, 100%, ${(4*idx) + 25}%)`}),
                                        chart: {
                                            width: "100%",
                                            type: 'pie',
                                        },
                                        stroke: {
                                            show: false
                                        },
                                        labels: topGenres.slice(0,15).map((genre, idx) => {return genre[0]}),
                                        responsive: [{
                                            breakpoint: 1050,
                                            options: {
                                            chart: {
                                                width: "100%"
                                            },
                                            dataLabels: {
                                                enabled: true,
                                                formatter: function (val, opts) {
                                                    return topGenres[opts.seriesIndex][0]
                                                },
                                                style: {
                                                    fontSize: '9px',
                                                    fontFamily: 'Montserrat',
                                                    fontWeight: 'normal'
                                                }
                                            },
                                            legend: {
                                                position: 'bottom',
                                                show: false,
                                            }
                                            }
                                        }],
                                        legend: {
                                            show: true,
                                            position: "bottom",
                                            fontSize: "18px",
                                            fontFamily: "Lato"
                                        },
                                        dataLabels: {
                                            enabled: true,
                                            formatter: function (val, opts) {
                                                // console.log(opts)
                                                return [topGenres[opts.seriesIndex][0], val.toFixed(2) + "%"]
                                            },
                                            style: {
                                                fontSize: '14px',
                                                fontFamily: 'Montserrat',
                                                fontWeight: 'normal'
                                            }
                                        },
                                    }
                                }
                                series={topGenres.slice(0,15).map((genre, idx) => {return genre[1]})}
                            />
                        </AnimationReveal>
                    </div>

                </div>
            </div>
            {/* end genre section */}
        </div>
    )
}

export default Main;