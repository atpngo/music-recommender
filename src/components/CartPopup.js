import React, { useEffect, useState, useRef } from "react";
import {Dialog, Stack, Paper, Autocomplete, TextField, Button, DialogTitle} from '@mui/material';
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

function CartPopup(props)
{
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    // used to open the dialogue for new playlist
    const [selection, setSelection] = useState(null);
    const [openNewPlaylist, setOpenNewPlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState(null);
    const [albumCovers, setAlbumCovers] = useState([]);
    const color = '#FFFFFF';

    const spotify = axios.create({
        baseURL: 'https://api.spotify.com/v1/',
        timeout: 1000,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    });

    useEffect(() => {
        
        // setSelection(null);
        setLoading(true);
        setAlbumCovers(JSON.parse(localStorage.getItem("savedSongs")))
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
                    let filteredPlaylist = playlistIds.filter(playlist => playlist.owner.id == localStorage.getItem("userID"));
                    // add selectable property
                    filteredPlaylist = filteredPlaylist.map(obj => ({...obj, selectable: true}));
                    filteredPlaylist.unshift({name: '----', selectable: false})
                    filteredPlaylist.unshift({name: 'Create Playlist', id: '0', selectable: true});
                    console.log(filteredPlaylist);
                    setPlaylists(filteredPlaylist);
                    setLoading(false);
                })
            }

        });
    }, []);


    // close new playlist dialog
    const handleNewPlaylistClose = () =>
    {
        setOpenNewPlaylist(false);
    }

    // this runs when we click the confirm button
    const processQuery = (e) =>
    {
        // make new playlist if needed
        // need to add another conditional here
        console.log(selection);

        if (selection.id == '0')
        {
            // make a popup
            setOpenNewPlaylist(true);
            console.log('ahhh make a new thing');
            setNewPlaylistName(null);
            return;
        }

        // use playlist id and make an axios call to add songs in cart 
        // get saved songs from localStorage
        let uris = JSON.parse(localStorage.getItem("savedSongs")).map(song => {
            return song.uri
        });
        console.log(uris);
        spotify.post('playlists/' + selection.id + '/tracks', uris)
        .then(res => {
            console.log(res);
            // remove playlists from localStorage
            localStorage.setItem("savedSongs", []);
            setAlbumCovers([]);
            // close dialog?
        })
        // clean up and reset cart
    }

    const handleInputChange = (e, newVal) => 
    {
        console.log(selection);
        setSelection(newVal);
        console.log(newVal);
    }

    const handleNewPlaylistChange = (e, newVal) =>
    {
        setNewPlaylistName(document.getElementById("newPlaylist").value);
    }


    // runs when we hit the create button
    const makeNewPlaylist = () =>
    {
        // playlist new is newPlaylistName
        
        console.log(newPlaylistName);
        if (newPlaylistName !== null && newPlaylistName.length > 0)
        {
            spotify.post('users/' + localStorage.getItem('userID') + '/playlists', {
                name: newPlaylistName,
                description: '',
                public: false
            })
            .then(res => {
                // need to extract new playlist and set it as selection so we actually add songs to it
                setSelection(res.data);
                processQuery();
            });
            setOpenNewPlaylist(false);
        }
    }

    if (loading)
    {
        return <div></div>
    }

    const debug = () =>
    {
        console.log(selection);
    }

    return(
       <div>
        <Dialog open={props.open} onClose={props.onClose} maxWidth='xl' TransitionComponent={Transition} keepMounted PaperProps={{style: {borderRadius: 20, backgroundColor: '#E28BBA'}}}>
                {/* <button onClick={debug}>Debug</button> */}

                <div style={{width: '75vw', height: '75vh', display: 'flex', padding: '30px', justifyContent: "center"}}>
                    <Stack direction="column" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                        {/* contains songs */}
                        <Paper elevation={10} sx={{backgroundColor: 'rgb(255,255,255,0.25)', height: '90%', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden', alignContent: 'flex-start', padding: '30px', paddingLeft: '0px', paddingRight: '0px', borderRadius: '20px'}}>
                        <Paper elevation={0} sx={{backgroundColor: 'rgb(255,255,255,0)', height: '90%', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'auto', alignContent: 'flex-start', justifyContent: 'center', padding: '30px', borderRadius: '20px'}}>
                            {albumCovers.map((song) => {
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
                            renderInput={(params) => 
                            <CustomTextField {...params} variant="outlined" placeholder="Select a playlist" 
                            sx={{input: {color: 'rgb(255, 255, 255, 0.9)', fontFamily: 'Montserrat, sans-serif'}}}
                            />}  sx={{width: '50vw', backgroundColor: 'rgb(255,255,255,0.2)', borderRadius: '20px', outline: 'none'}} />
                            <CustomButton disabled={selection === null || !selection.selectable} onClick={processQuery} sx={{height: '95%', marginLeft: '1vw'}}>CONFIRM</CustomButton>
                        </Stack>
                    </Stack>
                    
                </div>

            </Dialog>


            {/* dialog for new playlist */}
            <Dialog maxWidth='lg' open={openNewPlaylist} onClose={handleNewPlaylistClose} PaperProps={{style: {borderRadius: 20, backgroundColor: '#E28BBA', border: '4px green'}}}>
                <DialogTitle sx={{fontFamily: 'Montserrat, sans-serif', color: 'rgb(255, 255, 255, 0.7)', fontWeight: 'bold'}}>Enter new playlist name:</DialogTitle>
                <Stack direction="row" sx={{padding: "10px", display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%'}}>
                    <CustomTextField onChange={handleNewPlaylistChange} id="newPlaylist" sx={{ marginLeft: '3vw', width: '500px', input: {color: 'rgb(255, 255, 255, 0.9)', backgroundColor: 'rgb(255,255,255,0.2)', fontFamily: 'Montserrat, sans-serif', borderRadius: '20px'}}}/>
                    <CustomButton onClick={makeNewPlaylist} sx={{height: '100%', marginLeft: '1vw', borderRadius: '10px'}}>CREATE</CustomButton>
                </Stack>

            </Dialog>
       </div> 
    )
}

export default CartPopup;

// todo:
// add props for onclose, onopen