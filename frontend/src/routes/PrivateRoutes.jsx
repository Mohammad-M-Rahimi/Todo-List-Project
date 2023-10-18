import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Send a request to your backend to validate the token
      validateTokenWithBackend(token);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const validateTokenWithBackend = async (token) => {
    try {
      const response = await axios.post('https://127.0.0.1:5000/api/auth/login', null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsAuthenticated(false); // Token is valid, user is authenticated
      } else {
        setIsAuthenticated(true); // Token is invalid, user is not authenticated
      }
    } catch (error) {
      console.error('Error validating token:', error);
      setIsAuthenticated(true);
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;