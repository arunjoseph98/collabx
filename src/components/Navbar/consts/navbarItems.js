import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

export const boardNavbarItems =[
    {
        id:0,
        icon: AddCircleOutlineIcon,
        label:'New Board',
        route: null,
        functionName:'createBord'
    },
   
    
]

export const taskboardNavbarItems =[
    {
        id:0,
        icon: AddCircleOutlineIcon ,
        label:'Boards',
        route: '/taskboards',
        functionName:'goTo'
    },
    {
        id:1,
        icon: AddCircleOutlineIcon,
        label:'All Tasks',
        route: '/AllTasks',
        functionName:'goTo'
    },
    {
        id:2,
        icon: AddCircleOutlineIcon,
        label:'Completed Tasks',
        route: '/CompletedTasks',
        functionName:'goTo'
    },
    {
        id:3,
        icon: AddCircleOutlineIcon,
        label:'Overdue Tasks',
        route: '/OverdueTasks',
        functionName:'goTo'
    },
    
]

export const menuItems = [
    { id: "Notifications", icon: NotificationsIcon, label: "Notifications" },
    { id: "CollabX Docs", icon: DescriptionIcon, label: "CollabX Docs" },
    { id: "CollabX Chat", icon: ForumOutlinedIcon, label: "CollabX Chat" },
  ];