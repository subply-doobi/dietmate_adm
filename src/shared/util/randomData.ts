import { fakerKO as faker, ko } from "@faker-js/faker";

import { IOrder } from "../api/types/order";
import { IProduct } from "../api/types/product";

const createRandomOrder = (): any => {
  return {
    statusNm: faker.helpers.arrayElement([
      "checking",
      "complete",
      "noStock",
      "refund",
    ]),
    buyerNm: faker.person.fullName(),
    contact: faker.phone.number(),
    address: faker.location.streetAddress(),
    price: parseInt(faker.commerce.price({ min: 10000, max: 150000 }), 10),
    orderDate: String(faker.date.recent({ days: 60 })),
    request: faker.helpers.arrayElement(["", "refund", "exchange"]),
    orderNo: faker.string.uuid(),
  };
};

export const makeOrderData = (num: number) => {
  return Array.from({ length: num }, createRandomOrder);
};

const createRandomProduct = (): any => {
  return {
    calorie: String(faker.number.int({ min: 10, max: 800 })),
    carb: String(faker.number.int({ min: 0, max: 120 })),
    categoryCd: faker.string.sample({ min: 3, max: 3 }),
    categoryNm: faker.helpers.arrayElement([
      "도시락",
      "닭가슴살",
      "샐러드",
      "과자",
      "음료",
      "영양간식",
    ]),
    cholesterol: String(faker.number.int({ min: 0, max: 5 })),
    dietNo: "",
    dietSeq: "",
    distributerBizNo: "",
    distributerNm: "",
    fat: String(faker.number.int({ min: 0, max: 30 })),
    fiber: String(faker.number.int({ min: 0, max: 10 })),
    freeShippingPrice: "3000",
    freeShippingYn: "Y",
    mainAttId: "",
    mainAttUrl: faker.image.url(),
    manufacturerBizNo: "",
    manufacturerNm: "",
    minQty: "1",
    platformNm: faker.helpers.arrayElement([
      "바르닭",
      "샐러드판다",
      "포켓샐러드",
      "다이어트메이트",
    ]),
    price: faker.commerce.price({ min: 1000, max: 12000 }),
    priceCalorieCompare: "",
    priceProteinCompare: "",
    productChoiceYn: "",
    productNm: faker.commerce.productName(),
    productNo: faker.string.uuid(),
    protein: String(faker.number.int({ min: 0, max: 120 })),
    saturatedFat: String(faker.number.int({ min: 0, max: 10 })),
    servingSize: String(faker.number.int({ min: 10, max: 200 })),
    shippingPrice: "3000",
    sodium: String(faker.number.int({ min: 0, max: 1000 })),
    subAttId: "",
    subAttUrl: "",
    subCategoryCd: "",
    subCategoryNm: "",
    sugar: String(faker.number.int({ min: 0, max: 30 })),
    transFat: String(faker.number.int({ min: 0, max: 5 })),
    link1: "",
    link2: "",
    itemReportNo: "",

    // temp
    statusNm: faker.helpers.arrayElement(["판매중", "재고없음", "영구삭제"]),
    detailLink1: "",
    detailLink2: "",
    detailLink3: "",
    detailLink4: "",
    detailLink5: "",
  };
};

export const makeProductData = (num: number) => {
  return Array.from({ length: num }, createRandomProduct);
};
