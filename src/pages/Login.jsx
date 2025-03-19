import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Logo from "../assets/Logo";
import loginIMG from "../assets/login_svg.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/allAPI";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const [snackbarState, setSnackbarState] = useState(false);

  const handleSnackbar = () => {
    setSnackbarState(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarState(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    if (formData.email && formData.password) {
      try {
        const result = await loginAPI(formData);
        console.log(result.data);

        if (result.status == 200) {
          useAuthStore.getState().login(result.data.user, result.data.token);
          // sessionStorage.setItem("token", result.data.token);
          setSnackbarMsg(result.data.message);
          setIsLogin(true);
          handleSnackbar();
          setTimeout(() => {
            setFormData({
              email: "",
              password: "",
            });
            navigate("/profile");
          }, 1500);
        } else {
          if (result.response.status == 401) {
            handleSnackbar();
            setSnackbarMsg(result.response.data.message);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completly!!");
    }
  };

  return (
    <Container
      maxWidth="100vw"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#185abd",
        p: 2,
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ p: { xs: 1, sm: 10 } }}
      >
        <Grid
          item
          xs={12}
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}
        >
          <Link to={"/"}>
            {" "}
            <Logo fillColor="#f9f9f9" width={140} />
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            mt: { xs: 11, md: 0 },
          }}
        >
          <Box
            component="img"
            src={loginIMG}
            alt="Log In"
            sx={{ width: "100%", maxWidth: 550 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 3, mt: { xs: 10, md: 0 } }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Log In
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Enter your credentials to access your account.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Log In
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Don't have an account?{" "}
              <Link to={"/signup"} href="/signup">
                Sign up
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarState}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={isLogin ? "success" : "error"}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
