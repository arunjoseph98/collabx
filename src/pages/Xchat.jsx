import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import NavDrawer from "../components/Navbar/NavDrawer/NavDrawer";
import Chat from "./pageComponents/Chat";


const Xchat = () => {
  

  return (
    <>
    <Box sx={{ display: 'flex' }} >
    <NavDrawer selectedPage={'CollabXChat'} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 ,backgroundColor: '#DADADA',minHeight:"100vh"}}>
        <Toolbar />
        
          <Chat/>
         
       
        
      </Box>
    </Box>
      
      
    </>
  );
};

export default Xchat;
