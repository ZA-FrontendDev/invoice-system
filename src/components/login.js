import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CssBaseline,
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // Check if email and password match the specific credentials
    if (email === "zain@gmail.com" && password === "zainahsan.123") {
      localStorage.setItem("isLoggedIn", true); // Store login status
      navigate("/invoices"); // Redirect to the InvoiceList page
    } else {
      setEmailError("Invalid email or password");
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      {" "}
      {/* Full viewport width and height */}
      <CssBaseline />
      <Grid container sx={{ height: "100%" }}>
        {/* Left Column - Blue Background */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            backgroundColor: "#1A4870", // Blue background
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff", // White text
            padding: 4,
            height: "100vh", // Full height
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Welcome to MyApp
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Manage your account efficiently and securely.
          </Typography>
          {/* Add your image here */}
          <Box
            component="img"
            src="/image512.png"
            alt="Login image"
            sx={{ width: "100%", maxWidth: "400px", mb: 4 }}
          />
        </Grid>

        {/* Right Column - Login Form */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ color: "#1A4870" }} component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#1A4870" }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
