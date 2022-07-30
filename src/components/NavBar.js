import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';


const pages = ['trends', 'songs'];

function NavBar()
{

  return (
    <AppBar position="static" sx={{backgroundColor: '#EF429F', height: '3.25em', display: 'flex', justifyContent: 'center'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            App Name Here
          </Box>
                
                {/* right side */}
          {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center" sx={{fontFamily: 'Montserrat', fontSize: '1.25em'}}>{page}</Typography>
                </MenuItem>
              ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default NavBar;