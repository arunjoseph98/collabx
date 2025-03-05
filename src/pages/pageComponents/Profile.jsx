import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import useAuthStore from "../../store/useAuthStore";
import { updateUserAPI, updateUserPasswordAPI } from "../../services/allAPI";
import serverURL from "../../services/serverURL";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    height: "30%",
    width: "30%",
    borderRadius: "50%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "100%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.8)",
      opacity: 0,
    },
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  border: `2px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  // console.log(user);

  const [preview, setPreview] = useState("");
  const [existingProfilePic, setExistingProfilePic] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profilePic: "",
  });
 
  const [editMode, setEditMode] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        username: user.username,
        email: user.email,
      }));
      setExistingProfilePic(user.profilePic);
    }
  }, [user]);

  useEffect(() => {
    if (userData.profilePic instanceof File) {
      const objectUrl = URL.createObjectURL(userData.profilePic);
      setPreview(objectUrl);
      console.log("Generated Preview URL:", objectUrl);
    } else {
      setPreview("");
    }
  }, [userData.profilePic]);

  useEffect(() => {
    console.log("Preview state updated:", preview);
    handelUpdateProfile();
  }, [preview]);

  const handelUpdateProfile = async () => {
    console.log("inside updateprofle");

    const { username, email, profilePic } = userData;
    if (username && email) {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);

      preview
        ? reqBody.append("profilePic", profilePic)
        : // console.log("p:",preview)
          reqBody.append("profilePic", existingProfilePic);

      const token = sessionStorage.getItem("auth-token");
      if (token) {
        const reqHeaders = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await updateUserAPI(reqBody, reqHeaders);
          if (result.status == 200) {
            console.log(result.data);

            updateUser(result.data);
            setSnackbar({
              open: true,
              message: "Profile updated successfully!",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please fill the form..",
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserData((prev) => ({ ...prev, profilePic: file }));

      setSnackbar({
        open: true,
        message: "Profile picture updated successfully!",
      });
    }
  };

  const handleSave = async () => {
    if (editMode) {
      await handelUpdateProfile();
    }
    setEditMode(!editMode);
  };

  const handlePasswordChange = async () => {
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
      });
      return;
    }
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      console.log("inside update password");
      const reqHeaders = {
        Authorization: `Bearer ${token}`,
      };
      const reqBody = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };
      try {
        const result = await updateUserPasswordAPI(reqBody, reqHeaders);
        if (result.status == 200) {
          setSnackbar({
            open: true,
            message: "Password updated successfully!",
          });
        }else{
          if (result.response.status == 400 || result.response.status == 404) {
            
            setSnackbar({
              open: true,
              message: result.response.data.message,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setOpenPasswordDialog(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ height: "calc(100vh - 64px)", py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {getGreeting()}, {user.username.split(" ")[0]}!
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <input
            accept="image/*"
            id="profile-image-upload"
            type="file"
            hidden
            onChange={(e) => handleImageUpload(e)}
          />
          <label htmlFor="profile-image-upload">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <CameraAltRoundedIcon />
                </IconButton>
              }
            >
              <ProfileAvatar
                src={preview || `${serverURL}/uploads/${existingProfilePic}`}
                alt={userData.username}
                aria-label="Profile picture"
              >
                {userData.username.charAt(0)}
              </ProfileAvatar>
            </StyledBadge>
          </label>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                startIcon={<EditNoteRoundedIcon />}
                onClick={handleSave}
                color={editMode ? "success" : "primary"}
              >
                {editMode ? "Save" : "Edit"}
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={userData.username}
                  disabled={!editMode}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={userData.email}
                  disabled={!editMode}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<LockRoundedIcon />}
                  onClick={() => setOpenPasswordDialog(true)}
                  variant="outlined"
                  fullWidth
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              margin="dense"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              margin="dense"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              margin="dense"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Profile;
