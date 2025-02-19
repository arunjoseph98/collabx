import React, { useState } from "react";
import { Button } from "@mui/material";
import ProfileUpdateModal from "./Profile";
import Navbar from "../components/Navbar/Navbar";
import NavDrawer from "../components/Navbar/NavDrawer/NavDrawer";
import Appbar from "../components/Navbar/AppBar/AppBar";
const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavDrawer />
    </>
  );
};

export default Dashboard;
