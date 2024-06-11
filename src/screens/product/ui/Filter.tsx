import styled from "styled-components";
import { colors } from "../../../shared/colors";
import { Col, Icon, Row, TextMain } from "../../../shared/ui/styledComps";
import { icons } from "../../../shared/iconSource";
import ToggleBtn from "../../../shared/ui/ToggleBtn";
import { useAppDispatch, useAppSelector } from "../../../app/reduxStore/hooks";
import SquareInput from "../../../shared/ui/SquareInput";
import {
  IProductFilterState,
  toggleCategoryBtn,
  togglePlatformNmBtn,
  toggleProductStatusBtn,
  setProductSearchText,
} from "../../../features/filter/productFilterSlice";

const FILTER_BTNS: {
  [K in keyof IProductFilterState]: {
    name: keyof IProductFilterState[K];
    label: string;
  }[];
} = {
  productStatus: [
    { name: "total", label: "전체" },
    { name: "onSale", label: "판매중" },
    { name: "noStock", label: "재고없음" },
    { name: "deleted", label: "영구삭제" },
  ],
  category: [
    { name: "total", label: "전체" },
    { name: "dosirak", label: "도시락" },
    { name: "salad", label: "샐러드" },
    { name: "chicken", label: "닭가슴살" },
    { name: "snack", label: "간식" },
    { name: "chips", label: "과자" },
    { name: "beverage", label: "음료" },
  ],
  platformNm: [
    { name: "total", label: "전체" },
    { name: "포켓샐러드", label: "포켓샐러드" },
    { name: "바르닭", label: "바르닭" },
    { name: "샐러드판다", label: "샐러드판다" },
    { name: "다이어트메이트", label: "다이어트메이트" },
  ],
  search: [],
};

const Filter = () => {
  // redux
  const dispatch = useAppDispatch();
  const { productStatus, category, platformNm, search } = useAppSelector(
    (state) => state.productFilter
  );

  return (
    <Box>
      <Col style={{ flex: 1, rowGap: 16 }}>
        {/* 날짜 */}
        <ItemRow>
          <ItemText style={{ flex: 1 }}>사용여부</ItemText>
          <RowWrap style={{ flex: 5 }}>
            {FILTER_BTNS.productStatus.map((btn) => (
              <ToggleBtn
                key={btn.name}
                btnText={btn.label}
                isActive={productStatus[btn.name]}
                onClick={() => dispatch(toggleProductStatusBtn(btn.name))}
              />
            ))}
          </RowWrap>
        </ItemRow>
        {/* 카테고리 */}
        <ItemRow>
          <ItemText>카테고리</ItemText>
          <RowWrap style={{ flex: 5 }}>
            {FILTER_BTNS.category.map((btn) => (
              <ToggleBtn
                key={btn.name}
                btnText={btn.label}
                isActive={category[btn.name]}
                onClick={() => dispatch(toggleCategoryBtn(btn.name))}
              />
            ))}
          </RowWrap>
        </ItemRow>
        {/* 요청사항 */}
        <ItemRow>
          <ItemText>플랫폼명</ItemText>
          <RowWrap>
            {FILTER_BTNS.platformNm.map((btn) => (
              <ToggleBtn
                key={btn.name}
                btnText={btn.label}
                isActive={platformNm[btn.name]}
                onClick={() => dispatch(togglePlatformNmBtn(btn.name))}
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
            onChange={(v) => dispatch(setProductSearchText(v.target.value))}
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
  flex: 5;
  flex-wrap: wrap;
  column-gap: 16px;
  row-gap: 8px;
`;

const ItemText = styled(TextMain)`
  flex: 1;
  width: 80px;
`;
