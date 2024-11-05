import styled from "styled-components";
import { Row, TextMain } from "../../../shared/ui/styledComps";
import SquareInput from "../../../shared/ui/SquareInput";
import { useAppDispatch, useAppSelector } from "../../../app/reduxStore/hooks";
import {
  IProductInputState,
  setValue,
} from "../../../features/productInput/productInputSlice";

const NUTRITION_LIST: {
  key: keyof IProductInputState;
  title: string;
  unit: string;
}[] = [
  { key: "content", title: "내용량", unit: "g" },
  { key: "calorie", title: "칼로리", unit: "kcal" },
  { key: "sodium", title: "나트륨", unit: "mg" },
  { key: "carb", title: "탄수화물", unit: "g" },
  { key: "sugar", title: "당류", unit: "g" },
  { key: "fiber", title: "식이섬유", unit: "g" },
  { key: "fat", title: "지방", unit: "g" },
  { key: "transFat", title: "트랜스지방", unit: "g" },
  { key: "saturatedFat", title: "포화지방", unit: "g" },
  { key: "protein", title: "단백질", unit: "g" },
  { key: "cholesterol", title: "콜레스테롤", unit: "mg" },
];

const Nutrition = () => {
  // redux
  const dispatch = useAppDispatch();
  const productInputState = useAppSelector((state) => state.productInput);

  return (
    <Container>
      {NUTRITION_LIST.map((nutrition) => (
        <Row key={nutrition.key} style={{ width: 180 }}>
          <TextMain style={{ flex: 1, fontSize: 14 }}>
            {nutrition.title} ({nutrition.unit})
          </TextMain>
          <SquareInput
            style={{ width: 64 }}
            value={productInputState[nutrition.key].value}
            onChange={(v) =>
              dispatch(setValue({ key: nutrition.key, value: v.target.value }))
            }
          />
        </Row>
      ))}
    </Container>
  );
};

export default Nutrition;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 40px;

  margin-top: 24px;
`;
