import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Log the token

    if (token) {
      validateTokenWithBackend(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const validateTokenWithBackend = async (token) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/token",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsAuthenticated(true); // Token is valid, user is authenticated
      } else {
        setIsAuthenticated(false); // Token is invalid, user is not authenticated
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setIsAuthenticated(false);
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
