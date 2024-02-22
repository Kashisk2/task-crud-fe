import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";
import { Style } from "./Notfound.style";

export const NotFoundPage = () => {
  return (
    <Container sx={Style.container}>
      <Typography variant="h1" sx={Style.text}>
        404
      </Typography>
      <Typography variant="h5" sx={Style.text}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={Style.text}>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={Style.button}
      >
        Go to Home
      </Button>
    </Container>
  );
};
