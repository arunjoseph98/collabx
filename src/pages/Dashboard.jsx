import React, { useState } from "react";
import { Button } from "@mui/material";
import ProfileUpdateModal from "./Profile";
const Dashboard = () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit Profile
        </Button>
        <ProfileUpdateModal open={open} handleClose={() => setOpen(false)} />
      </div>
    );
}

export default Dashboard