import { BottomNavigation, BottomNavigationAction, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Tooltip, styled } from "@mui/material";

const drawerWidth = 85;

export const navBarStyles = {
  appbar: {
    bgcolor: "#185abd",
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },
};

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "center",
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.active": {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "24px",
  color: theme.palette.text.primary,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));
