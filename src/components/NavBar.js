import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import logo from "../media/logo.png";
import useWindowDimensions from '../util/Window';

const pages = ['trends', 'songs'];

function NavBar()
{
  const navigate = useNavigate();
  const {width, height} = useWindowDimensions();

  const goToTrends = () =>
  {
    navigate('/main');
    window.location.reload();

  }

  const goToSongs = () =>
  {
    navigate('/matcher');
  }

  if (width < height)
  {
    return(
      <AppBar position="absolute" sx={{backgroundColor: '#EF429F', height: '3.25em', display: 'flex', justifyContent: 'center'}}>
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img draggable="false" src={logo} style={{width: '300px', height: '100%'}}></img>
            </Box>
        </Container>
      </AppBar>

    );
  }

  return (
    <AppBar position="absolute" sx={{backgroundColor: '#EF429F', height: '3.25em', display: 'flex', justifyContent: 'center'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          
          <Box sx={{ flexGrow: 1, }}>
            <img draggable="false" src={logo} style={{width: '300px', height: '100%'}}></img>
          </Box>
          
          <MenuItem>
            <Typography onClick={goToTrends} textAlign="center" sx={{fontFamily: 'Montserrat', fontSize: '1.25em'}}>trends</Typography>
          </MenuItem>
          <MenuItem>
          <Typography onClick={goToSongs} textAlign="center" sx={{fontFamily: 'Montserrat', fontSize: '1.25em'}}>songs</Typography>
          </MenuItem>

        
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default NavBar;