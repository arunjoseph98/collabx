import React, { useContext, useState } from "react";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { chatContext } from "../../ContextAPI/ChatContextAPI";
import { StyledChatListItem } from "./chatStyle";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddChatGroup from "./AddChatGroup";

const users = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Isaac",
  "Jack",
  "Kevin",
  "Lily",
  "Mason",
  "Nora",
  "Oliver",
  "Paul",
]; // Dummy user list

const ChatList = () => {
  const { selectedUser, setSelectedUser } = useContext(chatContext);
  const [open, setOpen] = useState(false);

  const handleCreateGroup = (group) => {
    console.log("Created Group:", group);
  };

  return (
   <>
      <Box
        sx={{
          bgcolor: "grey.200",
          p: 2,
          display: selectedUser ? { xs: "none", md: "block" } : "block",
          maxHeight: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" , justifyContent:"space-between" }}>
          <Typography variant="h6">Chat</Typography>
          <IconButton
        onClick={() => setOpen(true)}
        aria-label="newChat"
        color="primary"
        size="large"
        sx={{ pr: 3 }}
      >
        <GroupAddIcon />
      </IconButton>
        </Box>
        <List sx={{ maxHeight: "calc(90vh - 64px)", overflowY: "auto" }}>
          {users.map((user, index) => (
            <StyledChatListItem
              component="button"
              key={index}
              className={selectedUser === user ? "active" : ""}
              onClick={() => setSelectedUser(user)}
              sx={{
                border: "none",
              }}
            >
              <ListItemText primary={user} />
            </StyledChatListItem>
          ))}
        </List>
      </Box>
      <AddChatGroup open={open} onClose={() => setOpen(false)} onCreate={handleCreateGroup} />;
   </>
  );
};

export default ChatList;
