import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Divider,
} from "@mui/material";
import { chatContext } from "../../ContextAPI/ChatContextAPI";

import SendIcon from "@mui/icons-material/Send";

const ChatArea = () => {
  const { selectedUser, setSelectedUser } = useContext(chatContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        text: message,
        sender: "You",
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, msgData]);
      setMessage("");
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "white",
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "grey.100",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6">{selectedUser}</Typography>
        <Button
          variant="outlined"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setSelectedUser(null)}
        >
          Back
        </Button>
      </Box>

      {/* Chat Messages */}
      <Paper
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: "auto",
          maxHeight: "calc(100vh - 140px)", // Adjusts dynamically
          bgcolor:"#f9f9f9"
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              textAlign: msg.sender === "You" ? "right" : "left",
              mb: 1,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {msg.sender} • {msg.time}
            </Typography>
            <Typography
              sx={{
                display: "inline-block",
                bgcolor: msg.sender === "You" ? "#1976d2" : "#e0e0e0",
                color: msg.sender === "You" ? "white" : "black",
                p: 1,
                borderRadius: 1,
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      {/* Chat Input */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          bgcolor: "#f9f9f9",
          borderTop: "1px solid #ddd",
          position: "sticky",
          bottom: 0,
          width: "100%",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "4px 8px",
            display: "flex",
            alignItems: "center",
            flex: 1, // Make it responsive
            borderRadius: "10px", // Rounded look
            border: "1px solid #185abd",
            boxShadow: 1,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Type a message..."
            inputProps={{ "aria-label": "type a message" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px", borderRadius: "20%" }}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatArea;
