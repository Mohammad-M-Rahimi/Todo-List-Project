import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../theme/theme";
import axios from "axios";

const Login = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleRedirectToHome = () => {
    window.location.href = "./";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(data.get("email"));

    if (!isEmailValid) {
      setAlert({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/auth/login",
          {
            email: data.get("email"),
            password: data.get("password"),
          }
        );

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          setAlert({
            open: true,
            message: "Login successful!",
            severity: "success",
          });

          setTimeout(handleRedirectToHome, 1000);
        } else {
          setAlert({
            open: true,
            message: "Login failed!",
            severity: "error",
          });
        }
      } catch (error) {
        console.error("Login failed:", error);
        setAlert({
          open: true,
          message: "Login failed!",
          severity: "error",
        });
      }
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1548504769-900b70ed122e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your Email address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter your Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="./Register" variant="body2">
                    {"Don't have an account?"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
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

export default Login;
