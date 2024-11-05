import { IProductInputState } from "../../features/productInput/productInputSlice";

interface ISetFormData {
  inputState: IProductInputState;
  productNo: string | null;
  imgFile: File | null;
  mainAttId: string | null;
}
export function setFormData({
  inputState,
  productNo,
  imgFile,
  mainAttId,
}: ISetFormData): FormData {
  const formData = new FormData();
  // info for updating
  productNo && formData.append("productNo", productNo);
  mainAttId && formData.append("mainAttId", mainAttId);

  // base info
  formData.append("productNm", inputState.productNm.value);
  formData.append("platformNm", inputState.platformNm.value);
  formData.append("categoryCd", inputState.category.value);
  formData.append("statusCd", inputState.status.value);
  formData.append("subCategoryCd", inputState.subCategory.value);
  formData.append("price", inputState.price.value);
  formData.append("shippingPrice", inputState.shippingPrice.value);
  formData.append("freeShippingYn", inputState.freeShippingYn.value);
  formData.append("freeShippingPrice", inputState.freeShippingPrice.value);
  formData.append("minQty", "1");
  formData.append("link1", inputState.link1.value);
  formData.append("link2", inputState.link2.value);

  // nutr info
  formData.append("servingSize", inputState.content.value);
  formData.append("calorie", inputState.calorie.value);
  formData.append("sodium", inputState.sodium.value);
  formData.append("carb", inputState.carb.value);
  formData.append("sugar", inputState.sugar.value);
  formData.append("fiber", inputState.fiber.value);
  formData.append("protein", inputState.protein.value);
  formData.append("fat", inputState.fat.value);
  formData.append("saturatedFat", inputState.saturatedFat.value);
  formData.append("transFat", inputState.transFat.value);
  formData.append("cholesterol", inputState.cholesterol.value);

  // imgFile upload
  if (imgFile) {
    formData.append("mainAttFiles", imgFile);
  }

  const imgLinks = [
    inputState.detailLink1.value,
    inputState.detailLink2.value,
    inputState.detailLink3.value,
    inputState.detailLink4.value,
    inputState.detailLink5.value,
  ].filter((link) => link !== "");
  imgLinks.forEach((link) => {
    formData.append("imageLinks", link);
  });

  return formData;
}
