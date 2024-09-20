import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styled from "styled-components";

export const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isauthorizing, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isauthorizing) navigate("/login");
  }, [isAuthenticated, isauthorizing, navigate]);

  if (isauthorizing)
    return (
      <Fullpage>
        <Spinner />;
      </Fullpage>
    );

  if (!isAuthenticated) return null;

  return children;
}

export default ProtectedRoute;
