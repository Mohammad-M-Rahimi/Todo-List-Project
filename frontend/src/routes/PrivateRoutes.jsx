import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../service/isAuthenticated";
import Login from "../pages/Login";

function PrivateRoute({ component: Component, ...rest }) {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const isAuth = await isAuthenticated();
        console.log("isAuth from Validator", isAuth);
        setAuthState(isAuth);
      } catch (error) {
        console.log(error);
        setAuthState(false); // Handle error by setting authState to false
      }
    }
    checkAuth();
  }, []);

  if (authState === null) {
    // While waiting for authentication, you can return a loading component
    return <Login />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authState ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
