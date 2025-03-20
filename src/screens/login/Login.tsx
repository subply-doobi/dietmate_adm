import styled from "styled-components";
import { colors } from "../../shared/styles/colors";
import { Row } from "../../shared/ui/styledComps";
import { KLAuthUrl } from "../../shared/consts";
import LoadingContent from "../../components/loading/LoadingContent";
import { useEffect, useState } from "react";
import {
  getKakaoAccessToken,
  storeDoobiToken,
  validateToken,
} from "../../shared/api/query/token";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const logoSource = require("../../shared/img/appIcon_black.png");
  const handleLogin = async () => {
    window.location.href = KLAuthUrl;
  };

  useEffect(() => {
    const validateAuth = async () => {
      console.log("Login: validateAuth start");
      const code = new URL(window.location.href).searchParams.get("code");
      console.log("Login: code: ", code);
      // const code = searchParams.get("code");

      if (!code) {
        // code 없는 경우 === 첫 렌더링 시 token 유효성만 확인
        const isValid = await validateToken();
        // console.log("App: token isValid: ", isValid);
        if (!isValid) return;
      } else {
        // code 있는 경우 === token inValid -> kakaoToken 및 우리 토큰 (재)발급
        const kakaoAccessToken = await getKakaoAccessToken(code);
        // console.log("Login: kakaoAccessToken: ", kakaoAccessToken);
        const isSuccess = await storeDoobiToken(kakaoAccessToken);
        if (!isSuccess) return;

        // Remove the code parameter from the URL
        const url = new URL(window.location.href);
        url.search = ""; // Clear all search parameters
        window.history.replaceState({}, document.title, url.toString());
        console.log("Login: parmas removed from URL");
      }
      setIsLoggedIn(true);
      // window.location.href = "/#/product";
      setTimeout(() => {
        navigate("/product", { replace: true });
      }, 2000);
    };

    validateAuth();
  }, [navigate]);

  return (
    <Container>
      <Box>
        <Row style={{ alignItems: "flex-end" }}>
          <Logo src={logoSource} alt="DM Logo" />
          <Title>DM 관리자</Title>
        </Row>
        {/* logo */}
        <KakaoLoginBtn onClick={handleLogin}>카카오 로그인</KakaoLoginBtn>
        {/* <LoadingContent msg="kakao login processing" /> */}
      </Box>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
`;

const Title = styled.span`
  font-size: 32px;
  font-family: "KotraHope";
  line-height: 40px;
  margin-bottom: 4px;
  margin-left: 8px;
`;

const KakaoLoginBtn = styled.button`
  width: 150px;
  height: 40px;
  background-color: ${colors.kakaoColor};
  color: ${colors.black};
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 24px;
`;
