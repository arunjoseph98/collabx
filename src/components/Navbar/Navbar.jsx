import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useMediaQuery, Button } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { taskboardNavbarItems, boardNavbarItems } from './consts/navbarItems';
import { navBarStyles } from './navStyles';

// import AddNewBoard from '../modal/AddNewBoard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Logo from '../../assets/Logo';

const Navbar = ({ navOpt, setResBoard }) => {
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Media query to detect small screens
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const getItemsForNav = (navOpt) => {
    switch (navOpt) {
      case 'board':
        return boardNavbarItems;
      case 'taskboard':
        return taskboardNavbarItems;
      default:
        return [];
    }
  };

  const handleClick = (fn, route) => {
    switch (fn) {
      case 'createBord':
        return handleOpenModal();
      case 'goTo':
        const path = route === '/taskboards'
          ? route
          : (`${param.id ? `/${param.id}` : ''}${route}`);
        navigate(path);
        break;
      default:
        break;
    }
  };

  const drawerContent = (
    <List>
      {getItemsForNav("taskboard").map((item) => (
        <ListItem key={item.id} disablePadding>
          <ListItemButton
            onClick={() => handleClick(item.functionName, item.route)}
            selected={location.pathname === `${param.id ? `/${param.id}` : ''}${item.route}`}
          >
            <ListItemIcon sx={navBarStyles.icons}>
              <item.icon size={28} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={navBarStyles.appbar}>
        <Toolbar>
          <Box sx={navBarStyles.wrapper}>
            {isMobile && (
             <Box sx={navBarStyles.smallBox}>
                <IconButton sx={navBarStyles.menuIcons} edge="start" onClick={toggleDrawer}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <Logo fillColor="black" width={140}/>
             </Box>
            )}
            {!isMobile && <Logo fillColor="black" width={140}/>}
            <Box sx={navBarStyles.topRow}>
              <IconButton onClick={() => navigate('/')} sx={{color:'#fcfcf'}} aria-label="Logout">
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer: Temporary for Mobile, Permanent for Desktop */}
      <Drawer
        sx={navBarStyles.drawer}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={isMobile ? isDrawerOpen : true}
        onClose={toggleDrawer}
      >
        <Toolbar />
        <Divider />
        <Toolbar />
        {drawerContent}
      </Drawer>

      {/* Modal for Adding New Board */}
      {/* <AddNewBoard
        open={isModalOpen}
        handleClose={handleCloseModal}
        setResBoard={setResBoard}
      /> */}
    </>
  );
};

export default Navbar;
