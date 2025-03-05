import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconButton,
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  ListItemSecondaryAction,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { debounce } from "lodash";
import { getDocTitleAPI, updateDocTitleAPI } from "../../services/allAPI";
import useUserStore from "../../store/useUserStore";
import useDocumentStore from '../../store/useDocumentStore';
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const DocsHeader = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isShareOpen, setShareOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Zustand store functions
  const { 
    allUsers, sharedUsers, fetchUsers, addUserManually, removeUserManually 
  } = useUserStore();

  const { document, fetchDocument, connectWebSocket } = useDocumentStore();

  const [provider, setProvider] = useState(null);
  const [yTitle, setYTitle] = useState(null);

  // Initialize WebSocket & Y.js for real-time title sync

  // useEffect(() => {
  //   if (docId) {
  //     const ydoc = new Y.Doc();
  //     const wsProvider = new WebsocketProvider("ws://localhost:3000", docId, ydoc);
  //     const yText = ydoc.getText("title");
  
  //     setProvider(wsProvider);
  //     setYTitle(yText);
  
  //     // Prevent duplicate insertion by checking if Y.js already has a title
  //     if (yText.length === 0) {
  //       getDocTitleAPI(docId)
  //         .then((response) => {
  //           if (response.status === 200) {
  //             const fetchedTitle = response.data.title;
  //             setTitle(fetchedTitle);
  
  //             if (yText.toString().trim() === "") {
  //               yText.insert(0, fetchedTitle);
  //             }
  //           }
  //         })
  //         .catch((error) => console.error("Error fetching document title:", error));
  //     } else {
  //       setTitle(yText.toString());
  //     }
  
  //     yText.observe(() => {
  //       setTitle(yText.toString());
  //     });
  
  //     return () => {
  //       wsProvider.disconnect();
  //       ydoc.destroy();
  //     };
  //   }
  // }, [docId]);
  

  // Fetch document title from backend
  useEffect(() => {
    setTitle(" ")
    const fetchTitle = async () => {
      try {
        const response = await getDocTitleAPI(docId);
        if (response.status === 200) {
          setTitle(response.data.title);
          if (yTitle) yTitle.insert(0, response.data.title);
        }
      } catch (error) {
        console.error("Error fetching document title:", error);
      }
    };

    if (docId) {
      fetchTitle();
    }
  }, [docId, yTitle]);

  // Debounced API call to update title
// Debounced API call to update title in MongoDB
const debouncedUpdateTitle = useCallback(
  debounce(async (newTitle) => {
    if (!docId || !newTitle.trim()) return; // Avoid empty titles

    try {
      const response = await updateDocTitleAPI(docId, { title: newTitle });

      if (response.status !== 200) {
        console.error("Failed to update title in DB:", response);
      }
    } catch (error) {
      console.error("Error updating title:", error);
    }
  }, 1000),
  [docId]
);

// Handle title change
const handleTitleChange = (e) => {
  const newTitle = e.target.value;
  setTitle(newTitle);

  if (yTitle) {
    yTitle.delete(0, yTitle.length);
    yTitle.insert(0, newTitle);
  }

  debouncedUpdateTitle(newTitle); // Send update to backend
};

  // Fetch users when the Share dialog opens
  useEffect(() => {
    if (isShareOpen) {
      fetchUsers();
    }
  }, [isShareOpen]);

  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Manually add/remove shared users
  const handleAddUser = async (userEmail) => {
    try {
      const response = await addUserManually(docId, userEmail);
      if (response.status === 200) {
        console.log(`✅ User ${userEmail} added as a collaborator.`);
      } else {
        console.error("❌ Failed to add collaborator:", response);
      }
    } catch (error) {
      console.error("❌ Error adding collaborator:", error);
    }
  };
  const handleRemoveUser = (userEmail) => {
    removeUserManually(docId, userEmail);
  };

  // Filter users based on search term
  const filteredUsers = allUsers.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
        <IconButton onClick={() => navigate(-1)} aria-label="Go Back">
          <ArrowBackIcon sx={{ color: "#f9f9f9" }} />
        </IconButton>

        {/* Editable Title */}
        <TextField
          variant="standard"
          value={title}
          onChange={handleTitleChange}
          inputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#f9f9f9",
            },
          }}
          sx={{ width: "50%", textAlign: "center" }}
        />

        {/* Share Button */}
        <Button
          variant="contained"
          onClick={handleShareOpen}
          startIcon={<ShareIcon />}
          sx={{ backgroundColor: "#f9f9f9", color: "#134692" }}
        >
          Share
        </Button>
      </Box>

      {/* Share Dialog */}
      <Dialog open={isShareOpen} onClose={handleShareClose}>
        <DialogTitle>Manage Shared Users</DialogTitle>
        <DialogContent>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for users..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: "10px" }}
          />

          {/* Shared Users List */}
          <List>
            {sharedUsers.map((userEmail) => (
              <ListItem key={userEmail}>
                <ListItemText primary={userEmail} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveUser(userEmail)}
                    color="error"
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Search Results */}
          {searchTerm && (
            <List>
              {filteredUsers
                .filter((user) => !sharedUsers.includes(user.email)) // Exclude already shared users
                .map((user) => (
                  <ListItem
                    button
                    key={user.email}
                    onClick={() => handleAddUser(user.email)}
                  >
                    <ListItemText primary={user.email} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleAddUser(user.email)}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocsHeader;
