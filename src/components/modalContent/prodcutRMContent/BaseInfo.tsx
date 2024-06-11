// RN
import { ChangeEvent, MouseEvent, useState } from "react";

// 3rd
import styled from "styled-components";

// Doobi
import {
  Col,
  HorizontalSpace,
  Icon,
  Row,
  TextMain,
} from "../../../shared/ui/styledComps";
import SquareInput from "../../../shared/ui/SquareInput";
import ToggleBtn from "../../../shared/ui/ToggleBtn";
import { useAppDispatch, useAppSelector } from "../../../app/reduxStore/hooks";
import { setValue } from "../../../features/productInput/productInputSlice";
import { colors } from "../../../shared/colors";
import { icons } from "../../../shared/iconSource";

const STATUS_BTNS = ["판매중", "재고없음", "영구삭제"];
const CATEGORY_BTNS = [
  "도시락",
  "샐러드",
  "닭가슴살",
  "영양간식",
  "과자",
  "음료",
];

const SUB_CATEGORY_BTNS = {
  도시락: ["반찬있는", "볶음밥/덮밥"],
  샐러드: ["칼로리없는", "식사대용"],
  닭가슴살: ["일반", "스테이크", "볼"],
  영양간식: ["프로틴바", "프로틴쿠키", "프로틴케이크"],
  과자: ["쿠키", "마카롱", "케이크"],
  음료: ["단백질", "식사대용"],
};

const DETAIL_LINK_INPUTS: Array<
  "detailLink1" | "detailLink2" | "detailLink3" | "detailLink4" | "detailLink5"
> = ["detailLink1", "detailLink2", "detailLink3", "detailLink4", "detailLink5"];

const BaseInfo = () => {
  // redux
  const dispatch = useAppDispatch();
  const {
    statusNm,
    productNm,
    category,
    subCategory,
    price,
    shippingPrice,
    freeShippingYn,
    freeShippingPrice,
    ...otherInputs
  } = useAppSelector((state) => state.productInput);

  // useState
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  console.log("BaseInfo: file: ", file);

  // etc
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const onFileUpload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file) {
      // const formData = new FormData();
      // formData.append('file', file);
      // axios.post('http://your-server-url.com/upload', formData);
      console.log("파일업로드!");
    }
  };

  const cancelIamge = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <Container>
      <Col style={{ rowGap: 16, flex: 3 }}>
        <RowBox>
          <Title>사용유무</Title>
          <BtnRow>
            {STATUS_BTNS.map((btn, idx) => (
              <ToggleBtn
                key={idx}
                btnText={btn}
                isActive={statusNm.value === btn}
                onClick={() =>
                  dispatch(setValue({ key: "statusNm", value: btn }))
                }
              />
            ))}
          </BtnRow>
        </RowBox>
        <RowBox>
          <Title>제품명</Title>
          <SquareInput
            style={{ flex: 3 }}
            value={productNm.value}
            onChange={(v) =>
              dispatch(setValue({ key: "productNm", value: v.target.value }))
            }
          />
        </RowBox>
        <RowBox>
          <Title>판매플랫폼</Title>
          <SquareInput
            style={{ flex: 3 }}
            value={productNm.value}
            onChange={(v) =>
              dispatch(setValue({ key: "platformNm", value: v.target.value }))
            }
          />
        </RowBox>
        <RowBox>
          <Title>카테고리</Title>
          <BtnRow>
            {CATEGORY_BTNS.map((btn, idx) => (
              <ToggleBtn
                key={idx}
                btnText={btn}
                isActive={category.value === btn}
                onClick={() =>
                  dispatch(setValue({ key: "category", value: btn }))
                }
              />
            ))}
          </BtnRow>
        </RowBox>
        <RowBox>
          <Title>하위카테고리</Title>
          <BtnRow>
            {SUB_CATEGORY_BTNS[category.value].map((btn, idx) => (
              <ToggleBtn
                key={idx}
                btnText={btn}
                isActive={subCategory.value === btn}
                onClick={() =>
                  dispatch(setValue({ key: "subCategory", value: btn }))
                }
              />
            ))}
          </BtnRow>
        </RowBox>
        <RowBox>
          <Title>가격</Title>
          <SquareInput
            style={{ flex: 3 }}
            value={price.value}
            onChange={(v) =>
              dispatch(setValue({ key: "price", value: v.target.value }))
            }
          />
        </RowBox>
        <RowBox>
          <Title>배송료</Title>
          <SquareInput
            style={{ flex: 3 }}
            value={shippingPrice.value}
            onChange={(v) =>
              dispatch(
                setValue({ key: "shippingPrice", value: v.target.value })
              )
            }
          />
        </RowBox>
        <RowBox>
          <Title>무료배송</Title>
          <SquareInput
            style={{ flex: 3 }}
            value={freeShippingYn.value}
            onChange={(v) =>
              dispatch(
                setValue({ key: "freeShippingYn", value: v.target.value })
              )
            }
          />
        </RowBox>
        <RowBox>
          <Title>무료배송료</Title>
          <SquareInput
            style={{ flex: 3 }}
            value={freeShippingPrice.value}
            onChange={(v) =>
              dispatch(
                setValue({ key: "freeShippingPrice", value: v.target.value })
              )
            }
          />
        </RowBox>
      </Col>
      <Col style={{ flex: 2, paddingLeft: 40 }}>
        <Text>썸네일</Text>
        <HorizontalSpace height={16} />
        <Row
          style={{
            alignItems: "flex-start",
            columnGap: 16,
            justifyContent: "space-between",
          }}
        >
          <input
            type="file"
            id="file"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <AddThumbnailBtn htmlFor="file">
            {previewUrl ? (
              <Preview src={previewUrl} alt="preview" />
            ) : (
              <Icon size={36} src={icons.plus_grey_36} />
            )}
          </AddThumbnailBtn>
          <Icon
            size={24}
            src={icons.cancel_round_24}
            onClick={() => {
              cancelIamge();
            }}
          />
        </Row>
        <HorizontalSpace height={16} />

        <HorizontalSpace height={40} />
        <Text>상세이미지 링크</Text>
        <Col style={{ marginTop: 16, rowGap: 8 }}>
          {DETAIL_LINK_INPUTS.map((key, idx) => (
            <SquareInput
              key={idx}
              value={otherInputs[key].value}
              onChange={(v) =>
                dispatch(setValue({ key, value: v.target.value }))
              }
            />
          ))}
        </Col>
      </Col>
    </Container>
  );
};

export default BaseInfo;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Text = styled(TextMain)`
  font-size: 14px;
  line-height: 18px;
`;

const RowBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Text)`
  flex: 1;
`;

const BtnRow = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;

  column-gap: 16px;
  row-gap: 8px;
  flex-wrap: wrap;
`;

const AddThumbnailBtn = styled.label`
  display: flex;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;

  border: 1px solid ${colors.lineLight};
  border-radius: 5px;
  background-color: transparent;
  margin-top: 16px;
  :hover {
    cursor: pointer;
  }
`;

const Preview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`;
