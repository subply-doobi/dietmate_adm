import {IOrderedProduct} from '../api/types/order';

export const sumUpPrice = (products: IOrderedProduct[]) => {
  return products.reduce(
    (acc, cur) => acc + parseInt(cur.price) * parseInt(cur.qty),
    0,
  );
};
