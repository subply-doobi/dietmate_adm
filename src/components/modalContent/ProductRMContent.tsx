import styled from "styled-components";
import { HorizontalSpace, Row, TextMain } from "../../shared/ui/styledComps";
import { colors } from "../../shared/styles/colors";
import { useAppDispatch, useAppSelector } from "../../app/reduxStore/hooks";
import BaseInfo from "./productRMContent/BaseInfo";
import Nutrition from "./productRMContent/Nutrition";
import {
  useCreateAdmProduct,
  useGetAdmProduct,
  useListAdmProduct,
  useListAdmProductDetail,
  useUpdateAdmProduct,
} from "../../shared/api/query/product";
import { useEffect, useState } from "react";
import {
  initializeProductInput,
  IProductInputState,
  loadProduct,
} from "../../features/productInput/productInputSlice";
import { closeRightModal } from "../../features/modal/modalSlice";
import { setFormData } from "../../shared/util/handleForm";

const checkIsInputValid = (productInputState: IProductInputState) => {
  console.log(
    "checkIsInputValid: productInputState:",
    productInputState.status
  );
  const keys = Object.keys(productInputState) as (keyof IProductInputState)[];
  for (let key of keys) {
    if (!productInputState[key].isValid) {
      console.log("checkIsInputValid: errMsg:", productInputState[key].errMsg);
      return {
        isValid: false,
        errMsg: productInputState[key].errMsg || "필수입력란을 확인해주세요",
      };
    }
  }
  return { isValid: true, errMsg: "" };
};

const ProductRMContent = () => {
  // redux
  const dispatch = useAppDispatch();
  const { dataId } = useAppSelector((state) => state.rightModal);
  const productFilterState = useAppSelector((state) => state.productFilter);
  const productInputState = useAppSelector((state) => state.productInput);

  // useState
  const [thumbnailImg, setThumbnailImg] = useState<File | null>(null);
  const isUpdating = dataId !== "";

  // react-query
  const { refetch: refetchProduct } = useListAdmProduct({
    enabled: false,
    filterState: productFilterState,
  });
  const createProductMutation = useCreateAdmProduct();
  const updateProductMutation = useUpdateAdmProduct();
  const { data: product } = useGetAdmProduct({
    productNo: dataId,
    enabled: isUpdating,
  });
  const { data: productDetail } = useListAdmProductDetail({
    productNo: dataId,
    enabled: isUpdating,
  });

  console.log("ProductRMContent: productInputState:", productInputState);
  useEffect(() => {
    if (!product || !productDetail) return;
    dispatch(loadProduct({ product, productDetail }));
  }, [product, dataId, productDetail, dispatch]);

  // fn
  const saveProduct = () => {
    const { isValid, errMsg } = checkIsInputValid(productInputState);
    console.log("saveProduct: isValid:", isValid, "errMsg:", errMsg);
    if (!isValid) {
      window.alert(errMsg);
      return;
    }
    const formData = setFormData({
      productNo: isUpdating ? dataId || null : null,
      inputState: productInputState,
      imgFile: thumbnailImg,
      mainAttId: isUpdating ? product?.mainAttId || null : null,
    });
    isUpdating
      ? updateProductMutation.mutate(formData)
      : createProductMutation.mutate(formData);
    dispatch(closeRightModal());
    refetchProduct();
  };
  return (
    <Container>
      <Row style={{ columnGap: 8, alignSelf: "flex-start" }}>
        <InitializeBtn onClick={() => dispatch(initializeProductInput())}>
          초기화
        </InitializeBtn>
        <SaveBtn onClick={saveProduct}>{isUpdating ? "수정" : "저장"}</SaveBtn>
      </Row>
      <HorizontalSpace height={40} />
      {/* 기본정보 */}
      <Title>기본</Title>
      <HorizontalSpace
        style={{
          backgroundColor: colors.dark,
          marginTop: 24,
          marginBottom: 24,
        }}
        height={2}
      />
      <BaseInfo thumbnailImg={thumbnailImg} setThumbnailImg={setThumbnailImg} />
      <HorizontalSpace height={40} />

      {/* 영양정보 */}
      <Title>영양</Title>
      <HorizontalSpace
        style={{ backgroundColor: colors.dark, marginTop: 24 }}
        height={2}
      />
      <Nutrition />
      <HorizontalSpace height={40} />
      <Row style={{ columnGap: 8, alignSelf: "flex-end" }}>
        <InitializeBtn onClick={() => dispatch(initializeProductInput())}>
          초기화
        </InitializeBtn>
        <SaveBtn onClick={saveProduct}>{isUpdating ? "수정" : "저장"}</SaveBtn>
      </Row>
    </Container>
  );
};

export default ProductRMContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
`;

const Title = styled(TextMain)`
  font-weight: bold;
`;

// 저장/수정 버튼
const SaveBtn = styled.button`
  width: 88px;
  height: 32px;
  background-color: ${colors.main};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: ${colors.highlight};
  }
  font-size: 14px;
  font-weight: bold;
`;

const InitializeBtn = styled.button`
  width: 88px;
  height: 32px;
  background-color: ${colors.inactive};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: ${colors.darker};
  }
  font-size: 14px;
  font-weight: bold;
`;
