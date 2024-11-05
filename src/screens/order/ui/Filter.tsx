import styled from "styled-components";
import { colors } from "../../../shared/styles/colors";
import { Col, Icon, Row, TextMain } from "../../../shared/ui/styledComps";
import { icons } from "../../../shared/iconSource";
import ToggleBtn from "../../../shared/ui/ToggleBtn";
import { useAppDispatch, useAppSelector } from "../../../app/reduxStore/hooks";
import {
  IOrderFilterState,
  setDateTotal,
  setEndDate,
  setOrderSearchText,
  setStartDate,
  setResultStatusCd,
  setRequestStatusCd,
  IResultStatusCd,
  IRequestCd,
} from "../../../features/filter/orderFilterSlice";
import SquareInput from "../../../shared/ui/SquareInput";
import { useListAdmOrder } from "../../../shared/api/query/order";
import { useResponsiveWidth } from "../../../shared/util/hooks";
import { useState } from "react";

const FILTER_BTNS: {
  date: { name: string; label: string }[];
  resultStatus: { cd: IResultStatusCd; label: string }[];
  request: { cd: IRequestCd; label: string }[];
  search: { name: string; label: string }[];
} = {
  date: [{ name: "total", label: "전체" }],
  resultStatus: [
    { cd: "", label: "전체" },
    { cd: "SP013001", label: "확인중" },
    { cd: "SP013002", label: "재고없음" },
    { cd: "SP013003", label: "환불요청" },
    { cd: "SP013004", label: "처리완료" },
  ],
  request: [
    { cd: "", label: "전체" },
    { cd: "SP014001", label: "환불" },
    { cd: "SP014002", label: "교환" },
  ],
  search: [],
};

const Filter = () => {
  // redux
  const dispatch = useAppDispatch();
  const { date, resultStatusCd, requestCd, search } = useAppSelector(
    (state) => state.orderFilter
  );

  // react-query
  const { data: orderData, refetch: refetchOrder } = useListAdmOrder({
    startDate: date.startDate,
    endDate: date.endDate,
    resultStatusCd,
    searchText: search,
    enabled: false,
  });

  // useState
  const [boxWidth, setBoxWidth] = useState<string>("100%");
  useResponsiveWidth({
    width1: "100%",
    width2: "70%",
    width3: "50%",
    bp1_2: 960,
    bp2_3: 1600,
    setWidth: setBoxWidth,
  });

  return (
    <Box style={{ width: boxWidth }}>
      <Col style={{ flex: 1, rowGap: 16 }}>
        {/* 날짜 */}
        <ItemRow>
          <ItemText>날짜</ItemText>
          <RowWrap>
            <ToggleBtn
              key={FILTER_BTNS.date[0].name}
              btnText={FILTER_BTNS.date[0].label}
              isActive={date["total"]}
              onChange={() => dispatch(setDateTotal())}
            />
            <SquareInput
              style={{ width: 100 }}
              placeholder="시작날짜"
              value={date.startDate}
              onChange={(v) => dispatch(setStartDate(v.target.value))}
            />
            <TextMain>~</TextMain>
            <SquareInput
              style={{ width: 100 }}
              placeholder="종료날짜"
              value={date.endDate}
              onChange={(v) => dispatch(setEndDate(v.target.value))}
            />
          </RowWrap>
        </ItemRow>

        {/* 주문상태 */}
        <ItemRow>
          <ItemText>주문상태</ItemText>
          <RowWrap>
            {FILTER_BTNS.resultStatus.map((btn) => (
              <ToggleBtn
                key={btn.cd}
                btnText={btn.label}
                isActive={btn.cd === resultStatusCd}
                onClick={() => dispatch(setResultStatusCd(btn.cd))}
              />
            ))}
          </RowWrap>
        </ItemRow>

        {/* 요청사항 */}
        <ItemRow>
          <ItemText>요청사항</ItemText>
          <RowWrap>
            {FILTER_BTNS.request.map((btn) => (
              <ToggleBtn
                key={btn.cd}
                btnText={btn.label}
                isActive={btn.cd === requestCd}
                onClick={() => dispatch(setRequestStatusCd(btn.cd))}
              />
            ))}
          </RowWrap>
        </ItemRow>

        {/* 검색 */}
        <ItemRow>
          <ItemText>검색</ItemText>
          <SquareInput
            style={{ flex: 5 }}
            placeholder="주문번호 | 사용자닉네임 | 주문자이름 | 배송지"
            value={search}
            onChange={(v) => dispatch(setOrderSearchText(v.target.value))}
          />
        </ItemRow>
      </Col>
      <SearchBtn onClick={() => refetchOrder()}>
        <Col style={{ alignItems: "center" }}>
          <Icon size={36} src={icons.search_white_36} />
          <SearchBtnText>검색</SearchBtnText>
        </Col>
      </SearchBtn>
    </Box>
  );
};

export default Filter;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  padding: 24px;
  border-radius: 5px;

  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 5px 8px 0px rgba(0, 0, 0, 0.15);
`;

const SearchBtn = styled.button`
  height: 206px;
  width: 88px;
  background-color: ${colors.dark};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-left: 40px;
  border: none;
  :hover {
    cursor: pointer;
    background-color: ${colors.darker};
  }
`;

const SearchBtnText = styled(TextMain)`
  font-weight: bold;
  color: ${colors.white};
  margin-top: 4px;
`;

const ItemRow = styled(Row)`
  flex: 1;
`;

const RowWrap = styled(Row)`
  flex-wrap: wrap;
  flex: 5;
  column-gap: 16px;
  row-gap: 8px;
`;

const ItemText = styled(TextMain)`
  width: 80px;
  flex: 1;
`;
