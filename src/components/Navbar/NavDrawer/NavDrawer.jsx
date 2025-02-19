import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { menuItems } from "../consts/navbarItems";
import { StyledDrawer, StyledListItem, IconWrapper } from "../navStyles";
import Appbar from "../AppBar/AppBar";

const NavDrawer = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [bottomNavValue, setBottomNavValue] = useState("home");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check for mobile screen

  const handleNavigation = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <>
      <Appbar />

      {/* Show Drawer for Desktop */}
      {!isMobile && (
        <StyledDrawer variant="permanent" anchor="left">
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <Tooltip key={item.id} title={item.label} placement="right" arrow>
                <StyledListItem
                  button
                  onClick={() => handleNavigation(item.id)}
                  className={activeItem === item.id ? "active" : ""}
                  aria-label={item.label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    paddingY: 1,
                  }}
                >
                  {/* Center Icon */}
                  <ListItemIcon sx={{ minWidth: "auto", display: "flex", justifyContent: "center" }}>
                    <IconWrapper>
                      <item.icon />
                    </IconWrapper>
                  </ListItemIcon>

                  {/* Text with Controlled Font Size */}
                  <ListItemText
                    primary={
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", textAlign: "center" }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </StyledListItem>
              </Tooltip>
            ))}
          </List>
        </StyledDrawer>
      )}

      {/* Show Bottom Navigation for Mobile */}
      {isMobile && (
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000, boxShadow: 3 }}>
          <BottomNavigation
            showLabels
            value={bottomNavValue}
            onChange={(event, newValue) => setBottomNavValue(newValue)}
          >
            {menuItems.map((item) => (
              <BottomNavigationAction
                key={item.id}
                label={item.label}
                icon={<item.icon />}
                onClick={() => handleNavigation(item.id)}
              />
            ))}
          </BottomNavigation>
        </Box>
      )}
    </>
  );
};

export default NavDrawer;
