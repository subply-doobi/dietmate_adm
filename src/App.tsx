import styled from "styled-components";

import { colors } from "./shared/colors";
import Drawer from "./components/drawer/Drawer";
import { Outlet } from "react-router-dom";
import RightModal from "./shared/ui/RightModal";

function App() {
  return (
    <Container>
      <Drawer />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <RightModal />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${colors.white};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 40px 0 40px;
  background-color: ${colors.backgroundLight};
  overflow: auto;
`;
