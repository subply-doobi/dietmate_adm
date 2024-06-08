import { IProduct } from "./product";

export interface IDietDetailProductData extends IProduct {
  qty: string;
  dietNo: string;
  dietSeq: string;
}
export type IDietDetailData = Array<IDietDetailProductData>;
