import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../service/isAuthenticated";

function PrivateRoute({ component: Component, ...rest }) {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const isAuth = await isAuthenticated();
        setAuthState(isAuth);
      } catch (error) {
        console.log(error);
      }
    }
    checkAuth();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        authState === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    );
}

export default PrivateRoute;
