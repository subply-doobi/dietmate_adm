import styled from "styled-components";
import { HorizontalSpace, TextMain } from "../../shared/ui/styledComps";
import Filter from "./ui/Filter";
import { useState } from "react";
import { IProduct } from "../../shared/api/types/product";
import { makeProductData } from "../../shared/util/randomData";
import ProductTable from "../../components/table/ProductTable";

export default function Product() {
  // testData
  const [data, setData] = useState<IProduct[]>(() => makeProductData(20));
  return (
    <Container>
      <HorizontalSpace height={16} />
      <TextMain style={{ fontWeight: "bold" }}>식품관리</TextMain>
      <HorizontalSpace height={16} />
      <Filter />
      <HorizontalSpace height={40} />
      <ProductTable tableData={data} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
