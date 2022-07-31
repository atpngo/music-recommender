import React from "react";
import {Dialog, Stack, Paper, Autocomplete, TextField, Button} from '@mui/material';
import AlbumCover from "../components/AlbumCover";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function CartPopup()
{
    const tmp = [
        'Cow1',
        'Cow1',
        'Cow1',
        'Cow1',
        'Cow1',
        'Cow1',
    ]

    return(
       <div>
        <Dialog maxWidth='xl' open={true} TransitionComponent={Transition} keepMounted PaperProps={{style: {borderRadius: 20, backgroundColor: '#E28BBA'}}}>
                <div style={{width: '75vw', height: '75vh', display: 'flex', padding: '30px'}}>
                    <Stack direction="column" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                        <Stack direction="row" sx={{marginTop: '30px'}}>
                            <Autocomplete disablePortal options={tmp} renderInput={(params) => <TextField {...params} variant="outlined" label="Select Playlist"/>} sx={{width: '50vw', backgroundColor: 'rgb(255,255,255,0.5)', borderRadius: '20px', outline: 'none'}} />
                            <Button sx={{height: '100%'}}>CONFIRM</Button>
                        </Stack>
                    </Stack>
                    
                </div>

            </Dialog>
       </div> 
    )
}

export default CartPopup;