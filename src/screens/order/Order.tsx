import styled from "styled-components";
import { HorizontalSpace, TextMain } from "../../shared/ui/styledComps";
import Filter from "./ui/Filter";
import Table from "../../components/table/OrderTable";
import { useState } from "react";
import { makeOrderData } from "../../shared/util/randomData";
import { IOrder } from "../../shared/api/types/order";

export default function Order() {
  // testData
  const [data, setData] = useState<IOrder[]>(() => makeOrderData(20));
  return (
    <Container>
      <HorizontalSpace height={16} />
      <TextMain style={{ fontWeight: "bold" }}>주문관리</TextMain>
      <HorizontalSpace height={16} />
      <Filter />
      <HorizontalSpace height={40} />
      <Table tableData={data} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
