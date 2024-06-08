import {IOrderedProduct} from '../api/types/order';

export const regroupBySeller = (products: IOrderedProduct[]) => {
  const result: {[key: string]: IOrderedProduct[]} = {};
  products.forEach(product => {
    if (result[product.platformNm]) {
      result[product.platformNm].push(product);
    } else {
      result[product.platformNm] = [product];
    }
  });
  return result;
};
