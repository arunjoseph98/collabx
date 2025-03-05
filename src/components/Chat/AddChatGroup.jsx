import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Brown" },
  
];

const AddChatGroup = ({ open, onClose, onCreate }) => {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleToggle = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (groupName && selectedUsers.length > 0) {
      onCreate({ groupName, users: selectedUsers });
      setGroupName("");
      setSelectedUsers([]);
      setSearchTerm("");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Chat Group</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          label="Group Name"
          variant="outlined"
          margin="normal"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
          <List>
            {filteredUsers.map((user) => (
              <ListItem key={user.id} component="div" onClick={() => handleToggle(user.id)}>
                <ListItemIcon>
                  <Checkbox checked={selectedUsers.includes(user.id)} />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleCreate}
          disabled={!groupName || selectedUsers.length === 0}
        >
          Create Group
        </Button>
      </Box>
    </Modal>
  );
};

export default AddChatGroup;
