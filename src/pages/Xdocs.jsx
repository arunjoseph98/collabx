import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import NavDrawer from "../components/Navbar/NavDrawer/NavDrawer";
import CollabXDocs from "./pageComponents/CollabXDocs";


const Xdocs = () => {
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
          <CollabXDocs />
        </Box>
      </Box>
    </>
  );
};

export default Xdocs;
