import styled from "styled-components";
import { HorizontalSpace, Row, TextMain } from "../../shared/ui/styledComps";
import Filter from "./ui/Filter";
import ProductTable from "../../components/table/ProductTable";
import { useListAdmProduct } from "../../shared/api/query/product";
import LoadingContent from "../../components/loading/LoadingContent";
import { colors } from "../../shared/styles/colors";
import { useAppDispatch } from "../../app/reduxStore/hooks";
import { openRightModal } from "../../features/modal/modalSlice";

export default function Product() {
  // redux
  const dispatch = useAppDispatch();

  // react-query
  const { data: productList, isLoading } = useListAdmProduct();

  // fn
  const onCreateProduct = () =>
    dispatch(openRightModal({ modalOption: "Product", dataId: "" }));

  return (
    <Container>
      <HorizontalSpace height={16} />
      <Row style={{ justifyContent: "space-between" }}>
        <TextMain style={{ fontWeight: "bold" }}>식품관리</TextMain>
        <Button onClick={onCreateProduct}>식품추가</Button>
      </Row>
      <HorizontalSpace height={16} />
      <Filter />
      {isLoading ? (
        <LoadingContent />
      ) : (
        productList && (
          <>
            <HorizontalSpace height={40} />
            {productList && (
              <TextMain style={{ fontWeight: "bold" }}>
                검색결과 {productList.length}개
              </TextMain>
            )}
            <HorizontalSpace height={16} />
            <ProductTable tableData={productList} />
          </>
        )
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  width: 88px;
  height: 32px;
  background-color: ${colors.main};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
`;
