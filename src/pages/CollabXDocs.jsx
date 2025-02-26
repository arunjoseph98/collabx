import { Add, Description } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import XDocsLogo from "../assets/XDocsLogo";

const CollabXDocs = () => {
  //     const navigate = useNavigate();
//   const [recentFiles, setRecentFiles] = useState([]);

  //   useEffect(() => {
  //     // Fetch recent documents from API (mocked for now)
  //     const fetchRecentDocs = async () => {
  //       // Replace with actual API call
  //       const data = [
  //         { id: "1", title: "Project Plan" },
  //         { id: "2", title: "Meeting Notes" },
  //         { id: "3", title: "Research Paper" },
  //       ];
  //       setRecentFiles(data);
  //     };

  //     fetchRecentDocs();
  //   }, []);

  //   const handleNewDoc = () => {
  //     // Redirect to a new document creation page
  //     navigate("/docs/new");
  //   };
  const recentFiles = [
    { id: "doc1", title: "Project Proposal" },
    { id: "doc2", title: "Meeting Notes" },
    { id: "doc3", title: "Design Document" }
  ]; // Sample recent files
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 4,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 2 }}>
        <XDocsLogo width={250} />
      </Box>

      {/* New Document Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ mb: 3, width: "100%", maxWidth: 300 }}
        onClick={() => navigate("/docs/new")}
      >
        New Document
      </Button>

      {/* Recent Files Section */}
      <Typography variant="h6" gutterBottom>
        Recent Files
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          maxHeight: "40vh", // ✅ Scroll if too many files
          overflowY: "auto",
        }}
      >
        {recentFiles.length > 0 ? (
          recentFiles.map((file) => (
            <Card
              key={file.id}
              onClick={() => navigate(`/docs/${file.id}`)}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                cursor: "pointer",
                mb: 1,
                transition: "0.2s",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              <Description sx={{ mr: 2, color: "gray" }} />
              <CardContent sx={{ p: 0 }}>
                <Typography>{file.title}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="textSecondary">No recent files</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CollabXDocs;
