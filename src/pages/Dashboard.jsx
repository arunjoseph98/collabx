import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import NavDrawer from "../components/Navbar/NavDrawer/NavDrawer";
import Chat from "./Chat";
import CollabXDocs from "./CollabXDocs";
import TxtEditor from "./TxtEditor";



const Dashboard = () => {
  

  return (
    <>
    <Box sx={{ display: 'flex' }} >
    <NavDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 0 ,backgroundColor: '#DADADA',minHeight:"100vh"}}>
        <Toolbar />
        
          {/* <Chat/> */}
          {/* <CollabXDocs/> */}
        <TxtEditor/>
       
        
      </Box>
    </Box>
      
      
    </>
  );
};

export default Dashboard;
