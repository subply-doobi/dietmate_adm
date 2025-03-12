import { colors } from "./styles/colors";
const isDevelopment = process.env.NODE_ENV === "development";

// KL
export const KLRestAPIKey = "ce0c93f9c72a7109b40d11b91ac54732";
export const KLJSKey = "87a8114121bb2a957da769a7ccb462d0";
// KLAuth
export const KLRedirectUrl = isDevelopment
  ? "http://localhost:3000/"
  : "https://subply-doobi.github.io/dietmate_adm/";
export const KLAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KLRestAPIKey}&redirect_uri=${KLRedirectUrl}&response_type=code`;

// COMMON_CODE
// PRODUCT_STATUS
export const PRODUCT_STATUS_CD_OBJ: { [key: string]: string } = {
  SP012001: "판매중",
  SP012002: "재고없음",
  SP012003: "영구삭제",
};

export const ORDER_RESULT_STATUS_CD_OBJ: {
  [key: string]: { label: string; color: string };
} = {
  SP013001: { label: "확인중", color: colors.greenBadge },
  SP013002: { label: "재고없음", color: colors.yellowBadge },
  SP013003: { label: "환불요청", color: colors.redBadge },
  SP013004: { label: "처리완료", color: colors.purpleBadge },
};

// CATEGORY
export const CATEGORY_CD_OBJ: {
  [key: string]: {
    cdNm: string;
    subCategory: { [key: string]: string };
  };
} = {
  CG001: {
    cdNm: "도시락",
    subCategory: {
      CG001001: "반찬포함",
      CG001002: "볶음밥",
      CG001003: "기타",
    },
  },
  CG002: {
    cdNm: "닭가슴살",
    subCategory: {
      CG002001: "일반",
      CG002002: "스테이크",
      CG002003: "소시지/핫바",
      CG002004: "슬라이스/큐브/조각",
      CG002005: "기타",
    },
  },
  CG003: {
    cdNm: "샐러드",
    subCategory: {
      CG003001: "일반",
      CG003002: "토핑(단백질)",
      CG003003: "기타",
    },
  },
  CG004: {
    cdNm: "영양간식",
    subCategory: {
      CG004001: "주먹밥",
      CG004002: "핫도그/소떡",
      CG004003: "치킨/피자",
      CG004004: "만두",
      CG004005: "기타",
    },
  },
  CG005: {
    cdNm: "과자",
    subCategory: {
      CG005001: "단백질바",
      CG005002: "칩",
      CG005003: "기타",
    },
  },
  CG006: {
    cdNm: "음료",
    subCategory: {
      CG006001: "식사대용",
      CG006002: "단백질음료",
      CG006003: "주스",
      CG006004: "탄산",
      CG006005: "기타",
    },
  },
};
