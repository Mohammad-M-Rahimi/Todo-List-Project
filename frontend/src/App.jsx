import { BrowserRouter as Router, Switch} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoutes"; 
import Theme from "./theme/theme";


const App = () => {

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Switch>
          <PrivateRoute restricted={false} component={Login} path="/Login" exact />
          <PrivateRoute restricted={false} component={Register} path="/Register" exact />
          <PrivateRoute restricted={true} component={Home} path="/" exact />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
