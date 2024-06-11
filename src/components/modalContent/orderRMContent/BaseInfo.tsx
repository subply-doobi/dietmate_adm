import React, { useState } from "react";
import { Icon, Row, TextMain } from "../../../shared/ui/styledComps";
import { colors } from "../../../shared/colors";
import { testOrderedProducts } from "../../../shared/consts";
import styled from "styled-components";
import { IOrderedProduct } from "../../../shared/api/types/order";
import { IProduct } from "../../../shared/api/types/product";
import { icons } from "../../../shared/iconSource";

const DROPDOWN_LIST = ["확인중", "주문완료", "재고없음", "환불"];
const statusNmToColor: { [key: string]: string } = {
  확인중: colors.yellowBadge,
  주문완료: colors.purpleBadge,
  재고없음: colors.redBadge,
  환불: colors.line,
};

// type guard
const isIOrderedProduct = (
  data: IOrderedProduct | IProduct | undefined
): data is IOrderedProduct => {
  if (!data) return false;
  return (data as IOrderedProduct)["buyDate"] !== undefined;
};

const BaseInfo = () => {
  // redux
  // const {data} = useAppSelector(state => state.rightModal);
  const data = testOrderedProducts[0];
  // useState
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // type guard
  if (!isIOrderedProduct(data)) return null;

  const BASE_INFO: {
    [key: string]: string;
  } = {
    주문번호: data?.orderNo,
    주문자: `${data?.buyerName} (${data?.buyerTel})`,
    주소: `${data.buyerAddr} (${data.buyerZipCode})`,
    배송참고: data.customData || "없음",
    주문금액: `${data.orderPrice}원`,
    배송비: `${data.shippingPrice}원`,
  };

  const changeStatus = (status: string) => {
    console.log(`${status}로 변경!`);
    setIsDropDownOpen(false);
  };

  return (
    <Row style={{ alignItems: "flex-start" }}>
      <BaseBox>
        {Object.keys(BASE_INFO).map((key, idx) => (
          <Row key={idx}>
            <Desc style={{ flex: 1 }}>{key}</Desc>
            <Desc style={{ flex: 3 }}>{BASE_INFO[key]}</Desc>
          </Row>
        ))}
      </BaseBox>
      <StatusBtn
        style={{
          backgroundColor: statusNmToColor[data.statusNm] || colors.white,
        }}
        onClick={() => setIsDropDownOpen(true)}
      >
        <Desc style={{ color: colors.white }}>{data?.statusNm}</Desc>
      </StatusBtn>
      {isDropDownOpen && (
        <DropDown>
          <Desc style={{ color: colors.white }}>주문상태를 변경해주세요</Desc>
          <Row
            style={{
              columnGap: 8,
              rowGap: 16,
              flexWrap: "wrap",
              marginTop: 16,
            }}
          >
            {DROPDOWN_LIST.map((status, idx) => (
              <StatusBtn
                key={idx}
                style={{
                  marginTop: 0,
                  backgroundColor: statusNmToColor[status],
                }}
                onClick={() => changeStatus(status)}
              >
                <Desc style={{ color: colors.white }}>{status}</Desc>
              </StatusBtn>
            ))}
          </Row>
          <CancelBtn onClick={() => setIsDropDownOpen(false)}>
            <Icon size={24} src={icons.cancel_round_24} />
          </CancelBtn>
        </DropDown>
      )}
    </Row>
  );
};

export default BaseInfo;

const BaseBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 24px;
  row-gap: 16px;
`;

const StatusBtn = styled.button`
  width: 80px;
  height: 32px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;

  margin-top: 24px;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const Desc = styled(TextMain)`
  font-size: 14px;
`;

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 112px;
  right: 24px;
  left: 24px;
  background-color: ${colors.darker};
  border-radius: 5px;
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

const CancelBtn = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;

  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;
  border: none;
  :hover {
    cursor: pointer;
  }
  background-color: transparent;
`;
