import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";


import Logo from "../../../assets/Logo";
import { navBarStyles } from "../navStyles";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

const settings = ["Profile", "Logout"];

function Appbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");

    const logout = useAuthStore.getState().logout; // Access Zustand logout function

    logout(); // Clears user state from Zustand
    sessionStorage.removeItem("token"); // Remove the token from sessionStorage

    navigate("/login"); // Redirect to login page
  };

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleUserMenu = (settings) => {
    switch (settings) {
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" sx={navBarStyles.appbar}>
      <Container maxWidth="100vw">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <Logo fillColor="#f9f9f9 " width={100} />
          </Box>
          {/* Mobile Menu Icon */}

          {/* Mobile Logo */}
          <Box sx={{ flexGrow: 1,display: { xs: "flex", md: "none" }}}>
            <Logo fillColor="#f9f9f9 " width={100} />
          </Box>
         
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {/* User Profile Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src=""
                  sx={{ width: 35, height: 35 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserMenu(setting)}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
  );
}

export default Appbar;
