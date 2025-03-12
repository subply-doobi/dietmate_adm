import styled from "styled-components";

import { colors } from "./shared/styles/colors";
import Drawer from "./components/drawer/Drawer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RightModal from "./shared/ui/RightModal";
import Login from "./screens/login/Login";
import { useEffect, useState } from "react";
import { storeDoobiToken, validateToken } from "./shared/api/query/token";
import { useGetKLToken } from "./shared/api/query/login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("App: location: ", location);

  const getKLTokenMutation = useGetKLToken();

  useEffect(() => {
    const login = async () => {
      const isValid = await validateToken();
      // console.log("App: token isValid: ", isValid);
      if (isValid) {
        setIsLoggedIn(true);
        // window.location.href = "/#/product";
        navigate("/product", { replace: true });
        return;
      }

      setIsLoggingIn(true);
      const code = new URL(window.location.href).searchParams.get("code");
      console.log("App: code: ", code);
      if (!code) return;
      const kakaoTokenRes = await getKLTokenMutation.mutateAsync({
        authCode: code,
      });
      // console.log(
      //   "KakaoLogin: kakaoTokenRes: ",
      //   kakaoTokenRes.access_token,
      //   kakaoTokenRes.refresh_token
      // );
      await storeDoobiToken(kakaoTokenRes.access_token);

      // 1 second delay
      setTimeout(() => {
        setIsLoggingIn(false);
        navigate("/product", { replace: true });
      }, 2000);
    };

    login();
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
        <Login isLoggingIn={isLoggingIn} />
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
