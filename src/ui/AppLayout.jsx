import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Div = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  max-width: 110rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <Div>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </Div>
  );
}

export default AppLayout;
