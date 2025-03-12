import styled from "styled-components";
import { colors } from "../../shared/styles/colors";
import { Row } from "../../shared/ui/styledComps";
import { KLAuthUrl } from "../../shared/consts";
import LoadingContent from "../../components/loading/LoadingContent";

const Login = ({ isLoggingIn }: { isLoggingIn: boolean }) => {
  const logoSource = require("../../shared/img/appIcon_black.png");

  const handleLogin = async () => {
    window.location.href = KLAuthUrl;
  };

  return (
    <Container>
      <Box>
        {isLoggingIn ? (
          <LoadingContent msg="kakao login processing" />
        ) : (
          <Row style={{ alignItems: "flex-end" }}>
            <Logo src={logoSource} alt="DM Logo" />
            <Title>DM 관리자</Title>
          </Row>
        )}
        {/* logo */}
        <KakaoLoginBtn onClick={handleLogin}>카카오 로그인</KakaoLoginBtn>
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
