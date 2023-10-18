import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../theme/theme";
import axios from "axios";

const Register = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleRedirectToLogin = () => {
    window.location.href = "./Login";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(data.get("email"));

    const password = data.get("password");
    const isPasswordValid =
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password);

    if (!isEmailValid) {
      setAlert({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
    } else if (!isPasswordValid) {
      setAlert({
        open: true,
        message:
          "Password must be at least 6 characters long and include uppercase letter, lowercase letter, digit.",
        severity: "error",
      });
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/auth/register",
          {
            userName: data.get("userName"),
            email: data.get("email"),
            password: data.get("password"),
          }
        );

        if (response.status === 201) {
          setAlert({
            open: true,
            message: "Registration successful!",
            severity: "success",
          });

          setTimeout(handleRedirectToLogin, 1000);
        } else {
          setAlert({
            open: true,
            message: "Registration failed!",
            severity: "error",
          });
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setAlert({
          open: true,
          message: "Registration failed!",
          severity: "error",
        });
      }
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="user-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={alert.severity}
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Register;
