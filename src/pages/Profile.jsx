import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Profile = ({ open, handleClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for small screens

  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated Profile:", formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "86%" : 400, // Adjust width for mobile screens
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Update Profile
        </Typography>

        {/* Avatar with Upload Button */}
        <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
          <Avatar
            src={profilePic}
            sx={{
              width: isMobile ? 80 : 100, // Adjust avatar size for mobile
              height: isMobile ? 80 : 100,
              mx: "auto",
            }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "white",
              p: 0.5,
              boxShadow: 3,
            }}
          >
            <CameraAlt fontSize="small" />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </IconButton>
        </Box>

        {/* Profile Update Fields */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          sx={{ mb: 2 }}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          sx={{ mb: 2 }}
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          sx={{ mb: 3 }}
          value={formData.password}
          onChange={handleChange}
        />

        {/* Action Buttons */}
        <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" color="error" fullWidth onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Profile;
