import { useMemo, useState } from "react";
import { Icon, Row, TextMain } from "../../../shared/ui/styledComps";
import { colors } from "../../../shared/styles/colors";
import styled from "styled-components";
import { IOrder, IOrderedProduct } from "../../../shared/api/types/order";
import { IProduct } from "../../../shared/api/types/product";
import { icons } from "../../../shared/iconSource";
import {
  useListAdmOrder,
  useUpdateAdmOrderResult,
} from "../../../shared/api/query/order";
import { useAppDispatch, useAppSelector } from "../../../app/reduxStore/hooks";
import { ORDER_RESULT_STATUS_CD_OBJ } from "../../../shared/consts";
import { closeRightModal } from "../../../features/modal/modalSlice";

// type guard
const isIOrderedProduct = (
  data: IOrder | IProduct | undefined
): data is IOrder => {
  if (!data) return false;
  return (data as IOrder)["orderDate"] !== undefined;
};

const BaseInfo = () => {
  // redux
  const dispatch = useAppDispatch();
  const { dataId } = useAppSelector((state) => state.rightModal);
  const { date, resultStatusCd, requestCd, search } = useAppSelector(
    (state) => state.orderFilter
  );

  // useState
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // react-query
  const { data: orderData, refetch: refetchOrder } = useListAdmOrder({
    startDate: date.startDate,
    endDate: date.endDate,
    resultStatusCd,
    searchText: search,
    enabled: false,
  });
  const updateAdmORMutation = useUpdateAdmOrderResult();

  const { currentOrder } = useMemo(() => {
    if (!orderData) return { currentResultStatusCd: {} };
    const currentOrder = orderData.find((d) => d.orderNo === dataId);
    return { currentOrder };
  }, [orderData]);

  // type guard
  // if (!isIOrderedProduct(testD)) return null;

  const BASE_INFO: {
    [key: string]: string;
  } = {
    주문번호: currentOrder?.orderNo || "",
    주문자: `${currentOrder?.buyerName} (${currentOrder?.buyerTel})`,
    주소: `${currentOrder?.buyerAddr} (${currentOrder?.buyerZipCode})`,
    배송참고: currentOrder?.customData || "없음",
    주문금액: `${currentOrder?.orderPrice}원`,
    배송비: `${currentOrder?.shippingPrice}원`,
  };

  const changeStatus = (statusCd: string) => {
    console.log(`no: ${currentOrder?.orderNo}, ${statusCd}로 변경!`);
    updateAdmORMutation.mutate({
      orderNo: dataId,
      resultStatusCd: statusCd,
    });
    setIsDropDownOpen(false);
    dispatch(closeRightModal());
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
          backgroundColor:
            ORDER_RESULT_STATUS_CD_OBJ[
              currentOrder?.resultStatusCd || "SP013001"
            ].color,
        }}
        onClick={() => setIsDropDownOpen(true)}
      >
        <Desc style={{ color: colors.white }}>
          {currentOrder?.resultStatusNm}
        </Desc>
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
            {Object.keys(ORDER_RESULT_STATUS_CD_OBJ).map((status, idx) => (
              <StatusBtn
                key={idx}
                style={{
                  marginTop: 0,
                  backgroundColor: ORDER_RESULT_STATUS_CD_OBJ[status].color,
                }}
                onClick={() => changeStatus(status)}
              >
                <Desc style={{ color: colors.white }}>
                  {ORDER_RESULT_STATUS_CD_OBJ[status].label}
                </Desc>
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
