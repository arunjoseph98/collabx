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
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { debounce } from "lodash";
import {
  getdocSharedUsers,
  getDocTitleAPI,
  updateDocTitleAPI,
} from "../../services/allAPI";
import useUserStore from "../../store/useUserStore";
import useDocumentStore from "../../store/useDocumentStore";

const DocsHeader = () => {
  const { docId } = useParams();
  const { document, titleupdate } = useDocumentStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isShareOpen, setShareOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sharedId, setSharedId] = useState([]);
  const [loading, setLoading] = useState(false);
  // document.collaborators

  // Zustand store functions
  const {
    allUsers,
    sharedUsers,
    fetchUsers,
    addUserManually,
    removeUserManually,
    getsharedUsers,
  } = useUserStore();

  useEffect(() => {
    setTitle(" ");
    const fetchTitle = async () => {
      try {
        const response = await getDocTitleAPI(docId);
        if (response.status === 200) {
          setTitle(response.data.title);
        }
      } catch (error) {
        console.error("Error fetching document title:", error);
      }
    };

    if (docId) {
      fetchTitle();
    }
  }, [docId]);

  useEffect(() => {
    setLoading(true);
        
    const fetchSusers = async () => {
      try {
        const response = await getdocSharedUsers(docId);
        if (response.status === 200) {
          setSharedId(response.data.collaborators);
          fetchUsers();
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching document title:", error);
      }
    };

    if (docId) {
      fetchSusers();
    }
  }, [docId,sharedUsers]);

  const handleTitleUpdate = async () => {
    await titleupdate(docId, title);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);

    setTitle(newTitle);
  };

  // Fetch users when the Share dialog opens
  // useEffect(() => {
  //   if (isShareOpen) {
  //     fetchUsers();
  //     handleGetsharedUsers();
  //   }
  // }, [isShareOpen]);

  const handleShareOpen = () => {
    setShareOpen(true);
    handleGetsharedUsers();
  }
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

  const handleGetsharedUsers = () => {
    // const sharedList = allUsers.map()
    const sharedList = allUsers
      .filter((user) => sharedId.includes(user._id)) // Filter users whose _id is in the ids array
      .map((user) => user.email);
      
    getsharedUsers(sharedList);
    console.log("sh", sharedList);
    
  };

  // Filter users based on search term
  const filteredUsers = allUsers.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackbtn = () => {
    navigate(-1);
    // cleanupYjs()
  };
// console.log("su",filteredUsers);

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
        <IconButton onClick={() => handleBackbtn()} aria-label="Go Back">
          <ArrowBackIcon sx={{ color: "#f9f9f9" }} />
        </IconButton>

        {/* Editable Title */}
        <TextField
          variant="standard"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleUpdate}
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
          {loading ? (
            <CircularProgress />
          ) : (
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
          )}

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
