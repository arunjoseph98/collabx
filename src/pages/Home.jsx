import React from "react";
import Logo from "../assets/Logo";
import heroIMG from "../assets/collaboration_hero.svg";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; 
import { Edit, Chat, Gesture } from "@mui/icons-material";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Collaborative Text Editing",
    description: "Edit documents in real time with seamless synchronization.",
    icon: <Edit fontSize="inherit" />,
  },
  {
    title: "Instant Chat",
    description: "Communicate with your team instantly while you work.",
    icon: <Chat fontSize="inherit" />,
  },
 
];

const Home = () => {
  return (
    // Full-page gradient background
    <Box  sx={{
      minHeight: "100vh",
      background: "linear-gradient(150deg, #f9f9f9, #185abd)", // Gradient background
    }}>
    <Box sx={{ display: "flex", justifyContent: "flex-end", p: 3 }}>
        <Button component={Link} to="/login" variant="contained" color="primary">
          Login
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
  
        <Box maxWidth="xl"  sx={{ padding: 6 }}>
          {/* Hero Section with Responsive Grid */}
          <Grid
            container
            spacing={6}
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {/* Left Side: Logo + Text */}
            <Grid
              xs={12}
              md={6}
              sx={{
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: { xs: "center", sm: "flex-start" },
                  mb:5
                }}
              >
                <Box sx={{ width: { xs: 200, sm:300, md: 300, lg: 500 } }}>
                  <Logo fillColor="black" />
                </Box>
              </Box>
  
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", sm: "flex-start" },
                }}
              >
                <Box sx={{width: { xs: 200, sm:300, md: 300, lg: 400 } }}>
                  <Typography
                    color="black"
                    variant="subtitle1"
                    gutterBottom
                    textAlign={{ xs: "center", sm: "left" }}
                    sx={{ mt: 2, fontSize: 20 }}
                  >
                    Real-time collaborative editing, chat, and whiteboarding—all
                    in one powerful tool.
                  </Typography>
                  <Button  component={Link} to="/signup" variant="contained" size="large" sx={{background:"#f59e0b"}}>
                    Get Started
                  </Button>
                </Box>
  
              </Box>
            </Grid>
  
            {/* Right Side: Image */}
            <Grid xs={12} md={6} display="flex" justifyContent="center">
              <Box
                component="img"
                src={heroIMG}
                alt="Collaboration"
                sx={{
                  width: { xs: "100%", sm: "70%", md: "80%" ,lg:"90%" }, // Full width on small screens, 80% on larger screens
                  maxWidth: 500,
                }}
              />
            </Grid>
          </Grid>
  
          {/* Features Section */}
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 20 }}>
            {features.map((feature, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <Card sx={{ textAlign: "center", p: 2 }}>
                  <CardContent>
                    <Box sx={{ fontSize: 50, color: "primary.main", mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
   
  );
};

export default Home;
