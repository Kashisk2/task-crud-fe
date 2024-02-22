import { Container } from "@mui/material";
import { Header } from "../Header";

// Define props interface for PublicRoute component
interface PublicRouteProps {
  children: JSX.Element; // Children components to be rendered inside PublicRoute
}

// PublicRoute component
export const PublicRoute = (props: PublicRouteProps) => {
  const { children } = props; // Destructure children from props
  return (
    <>
      {/* Container component to provide layout */}
      <Container maxWidth="lg">
        {/* Header component */}
        <Header />

        {/* Render children components */}
        {children}
      </Container>
    </>
  );
};
