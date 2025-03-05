import { Add, Description } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import XDocsLogo from "../../assets/XDocsLogo";
import { useNavigate } from "react-router-dom";
import { createNewDocAPI } from "../../services/allAPI";
import useDocumentStore from "../../store/useDocumentStore";
import useAuthStore from "../../store/useAuthStore";

const CollabXDocs = () => {
      const navigate = useNavigate();
      const { user } = useAuthStore()
      const userId = user?._id;
      const { alldocuments, loading, fetchUserDocuments } = useDocumentStore();

      useEffect(() => {
        if (userId) {
          fetchUserDocuments(userId);
        }
      }, [userId]);
    

  // Create a new document
  const handleNewDoc = async () => {
    try {
      if (!userId) {
        console.error("User ID not found!");
        return;
      }
  
      const response = await createNewDocAPI(userId);
      if (response.status === 201) {
        navigate(`/docs/${response.data._id}`);
      } else {
        console.error("Error creating document:", response);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };


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
        onClick={handleNewDoc} // Call handleNewDoc when clicked
      >
        New Document
      </Button>

      {/* Recent Files Section */}
      <Typography variant="h6" gutterBottom>
        Recent Files
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          {alldocuments.length > 0 ? (
            alldocuments.map((doc) => (
              <Card
                key={doc._id}
                sx={{ mb: 2, cursor: "pointer" }}
                onClick={() => navigate(`/docs/${doc._id}`)}
              >
                <CardContent>
                  <Description color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{doc.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last updated: {new Date(doc.updatedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.owner === userId ? "Owned by you" : "Shared with you"}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No documents found.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CollabXDocs;
