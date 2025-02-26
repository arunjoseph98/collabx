import { Box, Drawer, ListItem, styled } from "@mui/material";

const drawerWidth = 102;

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
    padding:3,
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor:"#f9f9f9",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  width:93,
  borderRadius:10,
  backgroundColor:"#f9f9f9",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.1)",
  },
  "&.active": {
    backgroundColor: theme.palette.action.selected,
    color:"#185abd",
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "24px",
  color: theme.palette.text.primary,
  "&.active": {
    color:"#185abd",
  },
}));
