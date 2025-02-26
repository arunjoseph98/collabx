import React, { useContext } from "react";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { chatContext } from "../../ContextAPI/ChatContextAPI";
import { StyledChatListItem } from "./chatStyle";
import AddIcon from '@mui/icons-material/Add';

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

  return (
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
        <IconButton aria-label="newChat"  color="primary" size="large" sx={{pr:3}}>
    <AddIcon />
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
  );
};

export default ChatList;
