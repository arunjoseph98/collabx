import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper, Grid } from "@mui/material";
import Logo from "../assets/Logo"; // Assuming you have a Logo component
import loginIMG from "../assets/login_svg.svg"; // Import your login image
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    // Placeholder for API call
    /*
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      // Handle successful login (e.g., redirect)
      console.log('Login successful:', data);
    })
    .catch(error => {
      // Handle login error
      console.error('Login error:', error);
    });
    */
  };

  return (
    <Container maxWidth="100vw" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#185abd", p: 2 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ p: { xs: 1, sm: 10 } }}>
        <Grid item xs={12} sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}>
         <Link to={"/"}> <Logo fillColor="#f9f9f9" width={140} /></Link>
        </Grid>

        <Grid item xs={12} md={6} sx={{
    display: { xs: 'none', sm: 'none', md: 'flex' }, // Use 'flex' to enable centering
    alignItems: "center",
    justifyContent: "center",
    mt: { xs: 11, md: 0 },
  }}>
          <Box component="img" src={loginIMG} alt="Log In" sx={{ width: "100%", maxWidth: 550 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: { xs: 10, md: 0 } }}>
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
              <Button fullWidth variant="contained" color="primary" size="large" type="submit">
                Log In
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Don't have an account? <Link to={"/signup"} href="/signup">Sign up</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;