import styled from "styled-components";
import { Squares } from "react-activity";
import "react-activity/dist/Squares.css";
import { colors } from "../../shared/styles/colors";

const LoadingContent = ({ msg }: { msg?: string }) => {
  return (
    <Container>
      {msg && <p>{msg}</p>}
      <Squares size={16} color={colors.main} />
    </Container>
  );
};

export default LoadingContent;

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
