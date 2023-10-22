import { Typography, Link } from "@mui/material";


function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="#FF9B50" href="https://github.com/Draxsis">
          Draxsis
        </Link>{" "}
        and .
        <Link color="#FF9B50" href="https://github.com/Mohammad-M-Rahimi">
          MMR
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  
export default Copyright;