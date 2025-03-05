import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import NavDrawer from "../components/Navbar/NavDrawer/NavDrawer";
import Profile from "./pageComponents/Profile";



const UserProfile = () => {
  

  return (
    <>
    <Box sx={{ display: 'flex' }} >
    <NavDrawer selectedPage={'UserProfile'} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 ,backgroundColor: '#DADADA',minHeight:"100vh"}}>
        <Toolbar />
        
          <Profile/>
       
        
      </Box>
    </Box>
      
      
    </>
  );
};

export default UserProfile;
