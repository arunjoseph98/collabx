import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import NavDrawer from "../components/Navbar/NavDrawer/NavDrawer";
import TxtEditor from "./pageComponents/TxtEditor";
import { useParams } from "react-router-dom";

const XdocsEditor = () => {
    const { docId } = useParams(); 
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavDrawer selectedPage={"CollabXDocs"} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            backgroundColor: "#DADADA",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          
          <TxtEditor docId={docId} />
        </Box>
      </Box>
    </>
  );
};

export default XdocsEditor;
