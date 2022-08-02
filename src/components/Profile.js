import React from "react";
import {Avatar, Stack, Paper} from "@mui/material";


function Profile()
{
    return(
        <div>
            <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Avatar imgProps={{draggable: false}} component={Paper} elevation={10} sx={{width: '15vw', height: "auto"}} src={localStorage.getItem("userImage")}/>
                <br/>
                <p style={{fontSize: "30px", fontWeight: "bold", color: "white"}}>{localStorage.getItem("userName")}</p>
            </Stack>
        </div>
    );
}

export default Profile;

