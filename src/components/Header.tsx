import { Container, AppBar, Typography, Grid } from "@mui/material";

const Header = () => {
  return (
    <header>
      <a
        href="#main-content"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        Skip to main content
      </a>
      <AppBar position="static" color="secondary">
        <Container>
          <Grid container spacing={2}>
            <Grid item>
              <img
                src="/images/wolt-logo.png"
                alt="Wolt Logo"
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
            </Grid>
            <Grid item alignSelf={"center"}>
              <Typography
                variant="h6"
                id="intro-text"
                style={{ fontSize: "1.5rem" }}
              >
                The Delivery Fee Calculator
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
