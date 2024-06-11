// doobi
import {
  HorizontalSpace,
  Icon,
  Row,
  TextMain,
} from "../../shared/ui/styledComps";
import styled from "styled-components";
import { colors } from "../../shared/colors";
import BaseInfo from "./orderRMContent/BaseInfo";
import SellerProducts from "./orderRMContent/SellerProducts";

const OrderRMContent = () => {
  return (
    <Container>
      {/* 기본정보 */}
      <Title>기본정보</Title>
      <HorizontalSpace
        style={{ backgroundColor: colors.dark, marginTop: 24 }}
        height={2}
      />
      <BaseInfo />

      {/* 식품사별 주문식품 */}
      <HorizontalSpace height={64} />
      <Title>식품사별 주문식품</Title>
      <HorizontalSpace
        style={{ backgroundColor: colors.dark, marginTop: 24 }}
        height={2}
      />
      <SellerProducts />
    </Container>
  );
};

export default OrderRMContent;

const Container = styled.div`
  padding: 40px 24px;
`;

const Title = styled(TextMain)`
  font-weight: bold;
`;
