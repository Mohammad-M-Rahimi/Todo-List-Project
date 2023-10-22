import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default AppBar;
