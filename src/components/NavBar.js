import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

const pages = ['trends', 'songs'];

function NavBar()
{
  const navigate = useNavigate();


  const goToTrends = () =>
  {
    navigate('/trends');
  }

  const goToSongs = () =>
  {
    navigate('/songs');
  }

  return (
    <AppBar position="static" sx={{backgroundColor: '#EF429F', height: '3.25em', display: 'flex', justifyContent: 'center'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            Spoti-Match
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