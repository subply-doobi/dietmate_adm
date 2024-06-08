import styled from "styled-components";
import { HorizontalSpace, TextMain } from "../../shared/ui/styledComps";
import Filter from "./ui/Filter";

export default function Product() {
  return (
    <Container>
      <HorizontalSpace height={16} />
      <TextMain style={{ fontWeight: "bold" }}>주문관리</TextMain>
      <HorizontalSpace height={16} />
      <Filter />
      <HorizontalSpace height={40} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
