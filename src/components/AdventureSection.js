// Audio Adventure Components

import SquareImage from "./SquareImage"
import useWindowDimensions from "../util/Window";
import Chart from "./Chart";
import { useEffect } from "react";


export default function AdventureSection({alignment, title, description, value, heading, mainSong, subSongs, color, data})
{
    const {width, height} = useWindowDimensions();
    useEffect(() => {
        console.log('MEEEOW')
        console.group(subSongs)
    }, [])
    return (
        <div className="flex flex-col gap-4" style={{color: color}}>
            <div 
                className="lg:pb-10 flex flex-col" 
                style={{textAlign: (width < 1050 ? "left" : alignment)}}    
            >
                <p className="font-main font-bold lg:text-[35px] text-[23px]">{title}</p>
                <p className="text-black font-alt lg:text-[25px] text-[18px]">{description} <b style={{color: color}}>{(value*100).toFixed(2)}%</b></p>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-10">
                <div className="flex flex-col max-w-[400px] items-center lg:items-start">
                    <div>
                        <p className="font-alt lg:text-[25px] text-[18px] text-black">{heading}</p>
                        <p className="font-alt lg:text-[25px] text-[18px]"><b>{mainSong.title}</b> by <b>{mainSong.artists}</b></p>
                    </div>
                    <SquareImage
                        src={mainSong.image}
                        size={(width < 1050) ? "250px" : "300px"}
                        color={color}
                        box="10px"
                        fontSize="20px"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    {/* graph */}
                    <div className="lg:w-[650px] lg:h-[327px] w-[300px] lg:h-[300px] h-[200px]">
                        <Chart
                            color={color}
                            data={data}
                        />
                    </div>
                    <div className="lg:flex hidden justify-between">
                        {subSongs.map((song, idx) => {
                            return (
                                <SquareImage
                                    key={idx}
                                    src={song.image}
                                    size={"140px"}
                                    color={color}
                                    box="5px"
                                    fontSize="20px"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}