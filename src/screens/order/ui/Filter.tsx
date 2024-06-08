import styled from "styled-components";
import { colors } from "../../../shared/colors";
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
  toggleOrderStatusBtn,
  toggleRequestBtn,
} from "../../../features/filter/orderFilterSlice";
import SquareInput from "../../../shared/ui/SquareInput";

const FILTER_BTNS: {
  [K in keyof IOrderFilterState]: {
    name: keyof IOrderFilterState[K];
    label: string;
  }[];
} = {
  date: [{ name: "total", label: "전체" }],
  orderStatus: [
    { name: "total", label: "전체" },
    { name: "checking", label: "확인중" },
    { name: "complete", label: "주문완료" },
    { name: "noStock", label: "재고없음" },
    { name: "refund", label: "환불" },
  ],
  request: [
    { name: "total", label: "전체" },
    { name: "refund", label: "환불" },
    { name: "replace", label: "교환" },
  ],
  search: [],
};

const Filter = () => {
  // redux
  const dispatch = useAppDispatch();
  const { date, orderStatus, request, search } = useAppSelector(
    (state) => state.orderFilter
  );

  return (
    <Box>
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
            {FILTER_BTNS.orderStatus.map((btn) => (
              <ToggleBtn
                key={btn.name}
                btnText={btn.label}
                isActive={orderStatus[btn.name]}
                onClick={() => dispatch(toggleOrderStatusBtn(btn.name))}
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
                key={btn.name}
                btnText={btn.label}
                isActive={request[btn.name]}
                onClick={() => dispatch(toggleRequestBtn(btn.name))}
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
      <SearchBtn>
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
