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
import { getdocSharedUsers, getDocTitleAPI } from "../../services/allAPI";
import useUserStore from "../../store/useUserStore";
import useDocumentStore from "../../store/useDocumentStore";
import useAuthStore from "../../store/useAuthStore";

const DocsHeader = () => {
  const { docId } = useParams();
  const { document, titleupdate } = useDocumentStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isShareOpen, setShareOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sharedId, setSharedId] = useState([]);

  const { user } = useAuthStore();
  const userId = user?._id;

  const {
    allUsers,
    sharedUsers,
    fetchUsers,
    addUserManually,
    removeUserManually,
    getsharedUsers,
    resetSharedUsers,
    loading,
  } = useUserStore();

  useEffect(() => {
    setTitle(" ");
    resetSharedUsers();
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
    

    const fetchSusers = async () => {
      try {
        const response = await getdocSharedUsers(docId);
        if (response.status === 200) {
          setSharedId(response.data.collaborators);
          fetchUsers();
        }
      } catch (error) {
        console.error("Error fetching document title:", error);
      }
    };

    if (docId) {
      fetchSusers();
    }
  }, [docId, sharedUsers]);

  const handleTitleUpdate = async () => {
    await titleupdate(docId, title);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);

    setTitle(newTitle);
  };

  const handleShareOpen = () => {
    setShareOpen(true);
    handleGetsharedUsers();
  };
  const handleShareClose = () => setShareOpen(false);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Manually add/remove shared users
  const handleAddUser = async (userEmail) => {
    try {
      const response = await addUserManually(docId, userEmail);
      if (response.status === 200) {
        console.log(`User ${userEmail} added as a collaborator.`);
      } else {
        console.error("Failed to add collaborator:", response);
      }
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };
  const handleRemoveUser = (userEmail) => {
    removeUserManually(docId, userEmail);
  };

  const handleGetsharedUsers = () => {
    setSearchTerm("");
    const sharedList = allUsers
      .filter((users) => sharedId.includes(users._id)) // Filter users whose id is in the ids array
      .map((users) => users.email);
    sharedList.length > 0 && getsharedUsers(sharedList);
    console.log("sh", sharedList);
    console.log("shu", sharedUsers);
  };

  // Filter users based on search term
  const filteredUsers = allUsers.filter(
    (users) =>
      users.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      users.email !== user.email
  );

  const handleBackbtn = () => {
    navigate(-1);
    resetSharedUsers();
  };

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
          disabled={document.owner != userId}
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
              {sharedUsers.length > 0 &&
                sharedUsers.map((userEmail) => (
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
                .filter(
                  (users) => !sharedUsers.includes(users.email)
                ) // Exclude already shared users
                .map((users) => (
                  <ListItem
                    button
                    key={users.email}
                    onClick={() => handleAddUser(users.email)}
                  >
                    <ListItemText primary={users.email} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleAddUser(users.email)}
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
