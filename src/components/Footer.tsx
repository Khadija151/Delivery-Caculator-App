import { AppBar, Toolbar, Typography, Grid } from "@mui/material";

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      style={{ position: "absolute", bottom: 0, width: "100%" }}
    >
      <a
        href="#main-content"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      >
        Skip to main content
      </a>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Typography
              variant="body2"
              id="footer-text"
              style={{ fontSize: "1rem" }}
            >
              © 2024 My Company. All rights reserved.
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
