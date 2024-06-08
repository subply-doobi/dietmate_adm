import styled from "styled-components";

import { colors } from "./shared/colors";
import Drawer from "./components/drawer/Drawer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Container>
      <Drawer />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100%;
  display: flex;
  background-color: ${colors.white};
`;

const ContentContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 40px 0 40px;
  background-color: ${colors.backgroundLight};
`;
