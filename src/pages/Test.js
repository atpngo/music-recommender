import axios from "axios";
import React, { useEffect } from "react";
import '../style/RoundButton.css';
import x from '../media/x.png';
import heart from '../media/heart.png';

function Test()
{
    
    // const
    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });


    useEffect(() => 
    {
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
        })
    }, []);

    const debug = () => 
    {
        
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

    


    return(
        <div>
        <NoButton onClick={debug}/>
        <HeartButton onClick={debug}/>
        </div>
    )
}

export default Test;