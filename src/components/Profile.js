import React from "react";
import {Avatar, Stack, Paper} from "@mui/material";


function Profile()
{
    return(
        <div>
            <Stack sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Avatar component={Paper} elevation={10} sx={{width: 250, height: "auto"}} src={localStorage.getItem("userImage")}/>
                <br/>
                <p style={{fontSize: "30px", fontWeight: "bold", color: "white"}}>{localStorage.getItem("userName")}</p>
            </Stack>
        </div>
    );
}

export default Profile;

