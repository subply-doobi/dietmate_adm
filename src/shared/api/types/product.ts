export interface IProduct {
  [key: string]: string;
  calorie: string;
  carb: string;
  categoryCd: string;
  categoryNm: string;
  cholesterol: string;
  distributerBizNo: string;
  distributerNm: string;
  fat: string;
  fiber: string;
  freeShippingPrice: string;
  freeShippingYn: string;
  itemReportNo: string;
  link1: string;
  link2: string;
  mainAttId: string;
  mainAttUrl: string;
  minQty: string;
  platformNm: string;
  price: string;
  productNm: string;
  productNo: string;
  protein: string;
  saturatedFat: string;
  servingSize: string;
  shippingPrice: string;
  sodium: string;
  statusCd: string;
  statusNm: string;
  subCategoryCd: string;
  subCategoryNm: string;
  sugar: string;
  tags: string;
  transFat: string;
  imgLinks: string;
}

// TBD
export interface ICreateProduct {
  [key: string]: string;
  // baseInfo
  tags: string;
  statusCd: string;
  productNm: string;
  platformNm: string;
  categoryCd: string;
  subCategoryCd: string;
  price: string;
  shippingPrice: string;
  freeShippingYn: string;
  freeShippingPrice: string;
  link1: string;
  link2: string;
  imageLinks: string; // Renamed from imgLinks

  // nutrInfo
  servingSize: string; // Added as it was not in the original interface
  calorie: string;
  carb: string;
  protein: string;
  fat: string;
  sodium: string;
  sugar: string;
  fiber: string;
  cholesterol: string;
  transFat: string;
  saturatedFat: string;

  // additionalInfo
  manufacturerNm: string; // Added as it was not in the original interface
  manufactureBizNo: string; // Added as it was not in the original interface
  distributerNm: string;
  distributerBizNo: string;
  itemReportNo: string;
}

export interface IProductDetail {
  productNo: string;
  seq: string;
  imageLink: string;
}

export interface IProductSummary {
  [key: string]: string;
  statusNm: string;
  mainAttUrl: string;
  platformNm: string;
  productNm: string;
  price: string;
  shippingPrice: string;
  freeShippingPrice: string;
  calorie: string;
  carb: string;
  protein: string;
  fat: string;
  productNo: string;
}
