import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../theme/theme";

const SpinnerContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
});

function Spinner() {
  const Theme = theme;
  return (
    <SpinnerContainer>
      <CircularProgress style={{ color: Theme.palette.secondary.main }} />{" "}
    </SpinnerContainer>
  );
}

export default Spinner;
