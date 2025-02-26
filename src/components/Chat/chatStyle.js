import { ListItem, styled } from "@mui/material";


export const StyledChatListItem = styled(ListItem)(({ theme }) => ({
    justifyContent: "center",
    padding: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.active": {
      backgroundColor: theme.palette.action.selected,
    },
  }));