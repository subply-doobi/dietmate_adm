// RN
import { useState } from "react";

// 3rd
import styled from "styled-components";

// doobi
import { makeOrderData } from "../../shared/util/randomData";
import { useListAdmOrder } from "../../shared/api/query/order";
import { useAppSelector } from "../../app/reduxStore/hooks";

import Filter from "./ui/Filter";
import LoadingContent from "../../components/loading/LoadingContent";
import OrderTable from "../../components/table/OrderTable";
import { HorizontalSpace, TextMain } from "../../shared/ui/styledComps";

import { IOrder } from "../../shared/api/types/order";

export default function Order() {
  // testData
  // const [data, setData] = useState<IOrder[]>(() => makeOrderData(20));

  // redux
  const { date, requestCd, resultStatusCd, search } = useAppSelector(
    (state) => state.orderFilter
  );

  // react-query
  const { data: orderData, isLoading } = useListAdmOrder({
    startDate: date.startDate,
    endDate: date.endDate,
    resultStatusCd,
    searchText: search,
  });

  return (
    <Container>
      <HorizontalSpace height={16} />
      <TextMain style={{ fontWeight: "bold" }}>주문관리</TextMain>
      <HorizontalSpace height={16} />
      <Filter />
      {isLoading ? (
        <LoadingContent />
      ) : (
        orderData && (
          <>
            <HorizontalSpace height={40} />
            {orderData && (
              <TextMain style={{ fontWeight: "bold" }}>
                검색결과 {orderData.length}개
              </TextMain>
            )}
            <HorizontalSpace height={16} />
            <OrderTable tableData={orderData} />
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
