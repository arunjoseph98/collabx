import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router
import { IconButton, TextField, Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DocsHeader = ({ initialTitle = "Untitled Document" }) => {
  const [title, setTitle] = useState(initialTitle);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box
    id="docHeader"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#134692",
      }}
    >
      {/* Back Button */}
      <IconButton onClick={handleBack}>
        <ArrowBackIcon sx={{color:"#f9f9f9"}}/>
      </IconButton>

      {/* Editable Title */}
      <TextField
  variant="standard"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  sx={{
    input: {
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#f9f9f9", 
    },
  }}
/>


      {/* Placeholder (for additional controls like share, settings, etc.) */}
      <Typography variant="body2" sx={{ color: "gray", minWidth: "50px" }}>
        {/* Empty space to keep layout balanced */}
      </Typography>
    </Box>
  );
};

export default DocsHeader;
