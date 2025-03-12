import styled from "styled-components";

import { colors } from "./shared/styles/colors";
import Drawer from "./components/drawer/Drawer";
import { Outlet } from "react-router-dom";
import RightModal from "./shared/ui/RightModal";
import Login from "./screens/login/Login";
import { useEffect, useState } from "react";
import { validateToken } from "./shared/api/query/token";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLogin = async () => {
      const isValid = await validateToken();
      if (isValid) setIsLoggedIn(true);
    };
    checkLogin();
  }, []);

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Drawer />
          <ContentContainer>
            <Outlet />
          </ContentContainer>
          <RightModal />
        </>
      ) : (
        <Login />
      )}
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
