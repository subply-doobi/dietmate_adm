import styled from "styled-components";
import { Col, Icon, Row, TextMain } from "../../../shared/ui/styledComps";
import { colors } from "../../../shared/styles/colors";
import { IOrderedProduct } from "../../../shared/api/types/order";
import { commaToNum } from "../../../shared/util/modString";
import { regroupByPlatform } from "../../../shared/util/dataTransfrom";
import { sumUpPrice } from "../../../shared/util/sumUp";
import { icons } from "../../../shared/iconSource";
import { BASE_URL } from "../../../shared/api/urls";
import { useMemo } from "react";

interface ISeller {
  products: IOrderedProduct[];
}
const Seller = ({ products }: ISeller) => {
  const sellerPrice = sumUpPrice(products);
  return (
    <Box>
      <Row style={{ justifyContent: "space-between" }}>
        <HomePageBtn
          onClick={() => {
            console.log("link1", products[0].link1);
            // link(products[0].link1);
            window.open(products[0].link1, "_blank");
          }}
        >
          <TextMain>{`${products[0].platformNm}`}</TextMain>
          <Icon size={24} src={icons.home_36} style={{ marginBottom: 2 }} />
        </HomePageBtn>
        <TextMain>{commaToNum(sellerPrice)} 원</TextMain>
      </Row>
      <Card>
        {products.map((p) => (
          <Col key={p.productNo} style={{ width: 100 }}>
            <Thumbnail
              src={`${BASE_URL}${p.mainAttUrl}`}
              onClick={() => window.open(p.link2, "_blank")}
            />
            <ProductName
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {p.productNm}
            </ProductName>
            <RightText style={{ fontWeight: "bold", marginTop: 4 }}>
              {commaToNum(p.price)}원
            </RightText>
            <RightText>{p.qty}개</RightText>
          </Col>
        ))}
      </Card>
    </Box>
  );
};

const SellerProducts = ({
  orderDAData,
}: {
  orderDAData: IOrderedProduct[];
}) => {
  const { productsBySeller } = useMemo(() => {
    if (!orderDAData) return { productsBySeller: {} };
    const productsBySeller = regroupByPlatform(orderDAData);
    return { productsBySeller };
  }, [orderDAData]);

  const sellerArr = Object.keys(productsBySeller);

  return (
    <Container>
      {sellerArr.map((seller, idx) => (
        <Seller key={idx} products={productsBySeller[seller]} />
      ))}
    </Container>
  );
};

export default SellerProducts;

const HomePageBtn = styled.button`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
  border: none;
  background-color: transparent;
  :hover {
    cursor: pointer;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  margin-top: 24px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  width: 100%;

  margin-top: 8px;
  padding: 24px;

  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 24px;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;

const ProductName = styled(TextMain)`
  font-size: 14px;
  color: ${colors.textMain};
  margin-top: 8px;
`;

const RightText = styled(TextMain)`
  font-size: 14px;
  text-align: flex-end;
  align-self: flex-end;
`;
