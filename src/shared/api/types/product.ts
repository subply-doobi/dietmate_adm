export interface IProduct {
  [key: string]: string;
  calorie: string;
  carb: string;
  categoryCd: string;
  categoryNm: string;
  cholesterol: string;
  dietNo: string;
  dietSeq: string;
  distributerBizNo: string;
  distributerNm: string;
  fat: string;
  fiber: string;
  freeShippingPrice: string;
  freeShippingYn: string;
  mainAttId: string;
  mainAttUrl: string;
  manufacturerBizNo: string;
  manufacturerNm: string;
  minQty: string;
  platformNm: string;
  price: string;
  priceCalorieCompare: string;
  priceProteinCompare: string;
  productChoiceYn: string;
  productNm: string;
  productNo: string;
  protein: string;
  saturatedFat: string;
  servingSize: string;
  shippingPrice: string;
  sodium: string;
  subAttId: string;
  subAttUrl: string;
  subCategoryCd: string;
  subCategoryNm: string;
  sugar: string;
  transFat: string;
  link1: string;
  link2: string;
  itemReportNo: string;

  // temp
  statusNm: "판매중" | "재고없음" | "영구삭제" | string;
  detailLink1: string;
  detailLink2: string;
  detailLink3: string;
  detailLink4: string;
  detailLink5: string;
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
