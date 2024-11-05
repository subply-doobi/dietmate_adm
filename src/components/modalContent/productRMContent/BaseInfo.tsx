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
import { colors } from "../../../shared/styles/colors";
import { icons } from "../../../shared/iconSource";
import { CATEGORY_CD_OBJ, PRODUCT_STATUS_CD_OBJ } from "../../../shared/consts";
import { useGetAdmProduct } from "../../../shared/api/query/product";
import { BASE_URL } from "../../../shared/api/urls";

const LINK_INPUTS: Array<"link1" | "link2"> = ["link1", "link2"];

const DETAIL_LINK_INPUTS: Array<
  "detailLink1" | "detailLink2" | "detailLink3" | "detailLink4" | "detailLink5"
> = ["detailLink1", "detailLink2", "detailLink3", "detailLink4", "detailLink5"];

interface IBaseInfo {
  thumbnailImg: File | null;
  setThumbnailImg: React.Dispatch<React.SetStateAction<File | null>>;
}
const BaseInfo = ({ thumbnailImg, setThumbnailImg }: IBaseInfo) => {
  // redux
  const dispatch = useAppDispatch();
  const {
    status,
    productNm,
    platformNm,
    category,
    subCategory,
    price,
    shippingPrice,
    freeShippingYn,
    freeShippingPrice,
    ...otherInputs
  } = useAppSelector((state) => state.productInput);
  const { dataId } = useAppSelector((state) => state.rightModal);

  // useState
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // react-query
  const { data: product } = useGetAdmProduct({
    productNo: dataId,
    enabled: dataId !== "",
  });

  // etc
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setThumbnailImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setThumbnailImg(null);
      setPreviewUrl(null);
    }
  };

  const cancelIamge = () => {
    setThumbnailImg(null);
    setPreviewUrl(null);
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // This resets the file input
    }
  };

  return (
    <Container>
      <Col style={{ rowGap: 16, flex: 3 }}>
        <RowBox>
          <Title>사용유무</Title>
          <BtnRow>
            {Object.keys(PRODUCT_STATUS_CD_OBJ).map((cd, idx) => (
              <ToggleBtn
                key={cd}
                btnText={PRODUCT_STATUS_CD_OBJ[cd] || ""}
                isActive={status.value === cd}
                onClick={() => dispatch(setValue({ key: "status", value: cd }))}
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
            value={platformNm.value}
            onChange={(v) =>
              dispatch(setValue({ key: "platformNm", value: v.target.value }))
            }
          />
        </RowBox>
        <RowBox>
          <Title>카테고리</Title>
          <BtnRow>
            {Object.keys(CATEGORY_CD_OBJ).map((cd, idx) => (
              <ToggleBtn
                key={cd}
                btnText={CATEGORY_CD_OBJ[cd]?.cdNm || ""}
                isActive={category.value === cd}
                onClick={() =>
                  dispatch(setValue({ key: "category", value: cd }))
                }
              />
            ))}
          </BtnRow>
        </RowBox>
        <RowBox>
          <Title>하위카테고리</Title>
          <BtnRow>
            {Object.keys(CATEGORY_CD_OBJ[category.value]?.subCategory).map(
              (cd, idx) => (
                <ToggleBtn
                  key={cd}
                  btnText={
                    CATEGORY_CD_OBJ[category.value]?.subCategory[cd] || ""
                  }
                  isActive={subCategory.value === cd}
                  onClick={() =>
                    dispatch(setValue({ key: "subCategory", value: cd }))
                  }
                />
              )
            )}
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
            ) : product?.mainAttUrl ? (
              <Preview src={`${BASE_URL}${product.mainAttUrl}`} />
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
        <Text>공식 쇼핑몰 및 상품페이지</Text>
        <Col style={{ marginTop: 16, rowGap: 8 }}>
          {LINK_INPUTS.map((key, idx) => (
            <Row key={idx}>
              <SquareInput
                placeholder={idx === 0 ? "공식쇼핑몰" : "상품페이지"}
                value={otherInputs[key].value}
                onChange={(v) =>
                  dispatch(setValue({ key, value: v.target.value }))
                }
              />
              <SmallBtn
                onClick={() => window.open(otherInputs[key].value, "_blank")}
              >
                ➡️
              </SmallBtn>
            </Row>
          ))}
        </Col>

        <HorizontalSpace height={40} />
        <Text>상세이미지 링크</Text>
        <Col style={{ marginTop: 16, rowGap: 8 }}>
          {DETAIL_LINK_INPUTS.map((key, idx) => (
            <Row key={idx}>
              <SquareInput
                value={otherInputs[key].value}
                onChange={(v) =>
                  dispatch(setValue({ key, value: v.target.value }))
                }
              />
              <SmallBtn
                onClick={() => window.open(otherInputs[key].value, "_blank")}
              >
                ➡️
              </SmallBtn>
            </Row>
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
  width: 200px;
  height: 200px;
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
  width: 200px;
  height: 200px;
  border-radius: 5px;
`;

const SmallBtn = styled.button`
  width: 24px;
  height: 24px;
  background-color: ${colors.highlight};
  font-size: 14px;
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.main};
  }

  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;
