import { Grid, Paper, Typography } from "@mui/material";

const Home = () => {
  return (
    <Grid container>
      {/* Left Side Panel */}
      <Grid item xs={3}>
        <Paper elevation={3}>
          {/* Place your left-side panel content here */}
          <Typography variant="h6">Left Panel</Typography>
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={9}>
        <Paper elevation={3}>
          {/* Place your main content here */}
          <Typography variant="h6">Main Content</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
