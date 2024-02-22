import { Container } from "@mui/material";
import { Header } from "../Header";

interface PublicRouteProps {
  children: JSX.Element;
}
export const PublicRoute = (props: PublicRouteProps) => {
  const { children } = props;
  return (
    <>
      <Container maxWidth="lg">
        <Header />

        {children}
      </Container>
    </>
  );
};
