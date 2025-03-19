import {
  Add,
  Description,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import XDocsLogo from "../../assets/XDocsLogo";
import { useNavigate } from "react-router-dom";
import { createNewDocAPI, removeDocAPI } from "../../services/allAPI";
import useDocumentStore from "../../store/useDocumentStore";
import useAuthStore from "../../store/useAuthStore";

const CollabXDocs = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const userId = user?._id;
  const { alldocuments, loading, fetchUserDocuments } = useDocumentStore();

  useEffect(() => {
    if (userId) {
      fetchUserDocuments(userId);
    }
  }, [userId]);

  // Menu State
  const [menuState, setMenuState] = useState({ id: null, anchorEl: null });

  // Snackbar State
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMenuOpen = (event, docId) => {
    event.stopPropagation(); 
    setMenuState({ id: docId, anchorEl: event.currentTarget });
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setMenuState({ id: null, anchorEl: null });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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

  const handleDelete = async (event,docId) => {
    event.stopPropagation();
    try {
      if (!docId) {
        console.error("Document ID not found!");
        return;
      }

      const response = await removeDocAPI(docId);
      if (response.status === 200) {
        fetchUserDocuments(userId); 
        setSnackbarOpen(true);
      } else {
        console.error("Error deleting document:", response);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
    handleMenuClose();
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
     
      <Box sx={{ mb: 2 }}>
        <XDocsLogo width={250} />
      </Box>

      
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ mb: 3, width: "100%", maxWidth: 300 }}
        onClick={handleNewDoc}
      >
        New Document
      </Button>

      
      <Typography variant="h6" gutterBottom>
        Recent Files
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{
          width: "100%",
          maxWidth: 500,
          maxHeight: "400px", 
          overflowY: "auto",  
          p: 2,
        }}>
          {alldocuments.length > 0 ? (
            alldocuments.map((doc) => (
              <Card
                key={doc._id}
                sx={{ mb: 2, cursor: "pointer" }}
                onClick={() => navigate(`/docs/${doc._id}`)}
              >
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    
                    <Box display="flex" alignItems="center">
                      <Description color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">{doc.title}</Typography>
                    </Box>

                    
                    <IconButton onClick={(e) => handleMenuOpen(e, doc._id)}>
                      <MoreVertIcon />
                    </IconButton>

                    
                    <Menu
                      anchorEl={menuState.id === doc._id ? menuState.anchorEl : null}
                      open={menuState.id === doc._id}
                      onClose={(e) => handleMenuClose(e)}
                    >
                      <MenuItem onClick={(e) => handleDelete(e,doc._id)}>
                        <DeleteIcon sx={{ mr: 1 }} color="error" /> Delete
                      </MenuItem>
                    </Menu>
                  </Box>

                  {/* Document Metadata */}
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

      {/* Snackbar for delete success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          Document deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CollabXDocs;
