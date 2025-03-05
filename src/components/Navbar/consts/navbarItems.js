import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DescriptionIcon from "@mui/icons-material/Description";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

export const menuItems = [
  {
    id: "UserProfile",
    icon: AccountCircleRoundedIcon,
    label: "User Profile",
    route: "/profile",
  },
  {
    id: "CollabXDocs",
    icon: DescriptionIcon,
    label: "CollabX Docs",
    route: "/docs",
  },
  {
    id: "CollabXChat",
    icon: ForumOutlinedIcon,
    label: "CollabX Chat",
    route: "/chat",
  },
];
