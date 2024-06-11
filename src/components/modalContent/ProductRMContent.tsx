import styled from "styled-components";
import { HorizontalSpace, TextMain } from "../../shared/ui/styledComps";
import { colors } from "../../shared/colors";
import { useAppSelector } from "../../app/reduxStore/hooks";
import BaseInfo from "./prodcutRMContent/BaseInfo";
import Nutrition from "./prodcutRMContent/Nutrition";

const ProductRMContent = () => {
  // redux
  // const {data, modalOption, isRMVisible} = useAppSelector(
  //   state => state.rightModal,
  // );

  return (
    <Container>
      {/* 기본정보 */}
      <Title>기본</Title>
      <HorizontalSpace
        style={{
          backgroundColor: colors.dark,
          marginTop: 24,
          marginBottom: 24,
        }}
        height={2}
      />
      <BaseInfo />
      <HorizontalSpace height={40} />

      {/* 영양정보 */}
      <Title>영양</Title>
      <HorizontalSpace
        style={{ backgroundColor: colors.dark, marginTop: 24 }}
        height={2}
      />
      <Nutrition />
      <HorizontalSpace height={40} />
    </Container>
  );
};

export default ProductRMContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
`;

const Title = styled(TextMain)`
  font-weight: bold;
`;
