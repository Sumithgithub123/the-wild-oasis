import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">User Login</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
