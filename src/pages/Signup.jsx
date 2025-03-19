import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper, Grid, Snackbar, Alert} from "@mui/material";
import Logo from "../assets/Logo";
import signupIMG from "../assets/signup_svg.svg";
import { Margin, Padding } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { registerAPI } from "../services/allAPI";

const Signup = () => {
  const navigate = useNavigate()
   const [isReg, setIsReg] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
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

    if (formData.username && formData.email && formData.password) {
      try {
        const result = await registerAPI(formData)
        console.log(result);
        
        if (result.status == 201) {
          setIsReg(true)
          setSnackbarMsg(`Welcome ${result.data.username}, Please login to explore our website!!!`)
          handleSnackbar()
          
          setTimeout(() => {
          navigate('/login')
          setIsReg(false)
          setFormData({
            username: "",
            email: "",
            password: "",
          })},2000)
        } else {
          if (result.response.status == 400) {
            handleSnackbar()
            setSnackbarMsg(result.response.data.message);
            setFormData({
              username: "",
              email: "",
              password: "",
            })
          }
        }

      } catch (error) {
        console.log(error);

      }
    }
    else {
      handleSnackbar()
      setSnackbarMsg("fill the form")
    }
  };

  return (
    <Container maxWidth="100vw" sx={{ minHeight: "100vh", display: "flex", alignItems: "center",bgcolor: "#185abd",p:2}}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ p:{ xs: 1, sm: 10 }}}>
        <Grid item xs={12} sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}>
          <Link to={"/"} ><Logo  fillColor="#f9f9f9 " width={140} /></Link>
        </Grid>

        <Grid
  item
  xs={12}
  md={6}
  sx={{
    display: { xs: 'none', sm: 'none', md: 'flex' }, 
    alignItems: "center",
    justifyContent: "center",
    mt: { xs: 11, md: 0 },
  }}
>
  <Box
    component="img"
    src={signupIMG}
    alt="Sign Up"
    sx={{
      width: "100%",
      maxWidth: 400,
      justifyContent: "center",
    }}
  />
</Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: { xs: 10, md: 0 } }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Create an account to start collaborating!
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />
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
                minLength={6}
              />
              <Button fullWidth variant="contained" color="primary" size="large" type="submit">
                Sign Up
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account? <Link to={"/login"} href="/login">Log in</Link>
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
        <Alert severity={isReg?"success":"error"} variant="filled" onClose={handleSnackbarClose}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;