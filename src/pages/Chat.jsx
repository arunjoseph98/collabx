import React, { useContext } from "react";
import { Box } from "@mui/material";
import ChatArea from "../components/Chat/ChatArea";
import { chatContext } from "../ContextAPI/ChatContextAPI";
import ChatList from "../components/Chat/ChatList";

const Chat = () => {
  const { selectedUser } = useContext(chatContext);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: selectedUser ? "1fr" : "1fr", md: "1fr 3fr" },
        height: "calc(100vh - 64px)", // Adjusted to fit inside the screen (64px for Toolbar)
        transition: "all 0.3s ease",
        overflow: "hidden", // Prevents extra scrolling issues
      }}
    >
      {/* Chat List (User Sidebar) */}
      <Box
        sx={{
          display: selectedUser ? { xs: "none", md: "block" } : "block",
          
          height: "100%",
          bgcolor: "grey.200",
        }}
      >
        <ChatList />
      </Box>

      {/* Chat Area */}
      {selectedUser && (
        <Box sx={{ height: "100%", overflow: "hidden" }}>
          <ChatArea />
        </Box>
      )}
    </Box>
  );
};

export default Chat;
