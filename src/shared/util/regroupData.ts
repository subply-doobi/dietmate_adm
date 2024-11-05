import { IOrderedProduct } from "../api/types/order";

export const regroupByPlatform = (
  orderDetailAll: Array<IOrderedProduct>
): Record<string, Array<IOrderedProduct>> => {
  const regroupedData: Record<string, Array<IOrderedProduct>> = {};

  orderDetailAll.forEach((item) => {
    const platform = item.platformNm;
    if (!regroupedData[platform]) {
      regroupedData[platform] = [];
    }

    const existingProduct = regroupedData[platform].find(
      (product) => product.productNo === item.productNo
    );

    if (existingProduct) {
      existingProduct.qty = (
        parseInt(existingProduct.qty) + parseInt(item.qty)
      ).toString();
    } else {
      regroupedData[platform].push({ ...item });
    }
  });

  return regroupedData;
};
