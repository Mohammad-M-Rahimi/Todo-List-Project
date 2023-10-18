import { Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes"; 

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <PrivateRoute
          authenticated={authenticated}
          path="/"
          exact
          component={Home}
        />
        <PublicRoute
          authenticated={authenticated}
          path="/login"
          component={Login}
        />
        <PublicRoute
          authenticated={authenticated}
          path="/register"
          component={Register}
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
