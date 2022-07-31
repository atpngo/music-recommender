import React, { useEffect, useState } from "react";
import {Dialog, Stack, Paper, Autocomplete, TextField, Button} from '@mui/material';
import AlbumCover from "../components/AlbumCover";
import Slide from '@mui/material/Slide';
import {styled} from '@mui/material/styles';
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CustomTextField = styled(TextField)({
    'fieldset' : {
        borderRadius: '20px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#EF429F',
        },
        '&:hover fieldset': {
            borderColor: 'pink',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#EF429F',
        },
    },

});


const CustomButton = styled(Button)(({theme}) => ({
    color: 'rgb(255, 255, 255, 0.90)',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'none',
    backgroundColor: 'rgb(255, 255, 255, 0.25)',
    borderRadius: '20px',
    '&:hover': {
        backgroundColor: 'rgb(255, 255, 255, 0.15)'
    }
}))

function CartPopup()
{
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const [selection, setSelection] = useState(null);

    const color = '#FFFFFF';

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    useEffect(() => {
        // calculate how many playlists they got
        setLoading(true);
        spotify.get('me/playlists')
        .then((res) => {
            let numPlaylists = res.data.total;
            let numQueries = Math.ceil(numPlaylists/50);
            if (numQueries > 0)
            {
                let pages = Array(numQueries).join(".").split(".");
                pages = pages.map((item, index) => "me/playlists?limit=50&offset=" + (50*index).toString());
                console.log(pages);
                axios.all(pages.map(page => spotify.get(page)))
                .then( res => {
                    console.log(res);

                    let playlistIds = [];
                    for (const response of res)
                    {
                        playlistIds.push.apply(playlistIds, response.data.items);
                    }
                    // we only want the ones where we can actually edit
                    const filteredPlaylist = playlistIds.filter(playlist => playlist.owner.id == localStorage.getItem("userID"));
                    console.log(filteredPlaylist);
                    setPlaylists(filteredPlaylist);
                    setLoading(false);
                })
            }

        });
    }, []);

    // this runs when we click the confirm button
    const processQuery = (e) =>
    {
        // use playlist id and make an axios call to add songs in cart 
        // clean up and reset cart
    }

    const handleInputChange = (e, newVal) => 
    {
        setSelection(newVal);
        console.log(newVal);
    }

    if (loading)
    {
        return <div></div>
    }

    return(
       <div>
        <Dialog maxWidth='xl' open={true} TransitionComponent={Transition} keepMounted PaperProps={{style: {borderRadius: 20, backgroundColor: '#E28BBA'}}}>
                <div style={{width: '75vw', height: '75vh', display: 'flex', padding: '30px', justifyContent: "center"}}>
                    <Stack direction="column" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        {/* contains songs */}
                        <Paper elevation={10} sx={{backgroundColor: 'rgb(255,255,255,0.25)', height: '90%', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden', alignContent: 'flex-start', padding: '30px', paddingLeft: '0px', paddingRight: '0px', borderRadius: '20px'}}>
                        <Paper elevation={0} sx={{backgroundColor: 'rgb(255,255,255,0)', height: '90%', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'auto', alignContent: 'flex-start', justifyContent: 'center', padding: '30px', borderRadius: '20px'}}>
                            {JSON.parse(localStorage.getItem("savedSongs")).map((song) => {
                                // return 
                                // need to make something that looks like this:
                                // <Avatar> <RemoveBtn/> </Avatar>
                                // remove btn passed as a child component and used to remove the song from the list
                                return <AlbumCover image={song.image}>
                                    {/* button here later */}
                                </AlbumCover>
                            })}
                        </Paper>
                        </Paper>
                        {/* contains options */}
                        <Stack direction="row" sx={{marginTop: '30px', display: 'flex', alignItems: 'center'}}>
                            <Autocomplete onChange={handleInputChange} disablePortal 
                            options={playlists} 
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <CustomTextField {...params} variant="outlined" placeholder="Select a playlist" 
                            sx={{input: {color: 'rgb(255, 255, 255, 0.9)', fontFamily: 'Montserrat, sans-serif'}}}
                            />}  sx={{width: '50vw', backgroundColor: 'rgb(255,255,255,0.2)', borderRadius: '20px', outline: 'none'}} />
                            <CustomButton onClick={processQuery} sx={{height: '95%', marginLeft: '1vw'}}>CONFIRM</CustomButton>
                        </Stack>
                    </Stack>
                    
                </div>

            </Dialog>
       </div> 
    )
}

export default CartPopup;

// todo:
// add props for onclose, onopen