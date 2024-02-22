import { Button, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Style } from "./Header.style";
import { PAGE_ROUTES } from "../../../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth={"md"}>
      <Stack
        justifyContent={
          location.pathname === PAGE_ROUTES.HomePage
            ? "center"
            : "space-between"
        }
        direction={"row"}
        sx={Style.HeaderStyle}
        alignItems={"center"}
      >
        {location.pathname !== PAGE_ROUTES.HomePage && (
          <Button onClick={() => navigate(-1)} variant="outlined">
            <ArrowBackIcon />
          </Button>
        )}
        <Typography variant="subtitle1">Task Management</Typography>
      </Stack>
    </Container>
  );
};
