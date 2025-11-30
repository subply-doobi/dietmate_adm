export const BASE_URL = "http://52.79.166.251:8080";

// KL token
export const KLTokenUrl = `https://kauth.kakao.com/oauth/token`;

// token
export const GET_AUTH = `${BASE_URL}/api/member/auth/get-auth`;
export const GET_TOKEN = `${BASE_URL}/api/every/token/get-token`;
export const RE_ISSUE_TOKEN = `${BASE_URL}/api/every/token/re-issue-token`;

// order
export const LIST_ADM_ORDER = `${BASE_URL}/api/admin/order/list-admin-order`;
export const GET_ADM_ORDER_DETAIL_ALL = `${BASE_URL}/api/admin/order/list-admin-order-detail-all`;
export const UPDATE_ADM_ORDER_RESULT = `${BASE_URL}/api/admin/order/update-admin-order-result`;

// product
export const LIST_ADM_PRODUCT = `${BASE_URL}/api/admin/product/list-admin-product`;
export const GET_ADM_PRODUCT = `${BASE_URL}/api/admin/product/get-admin-product`;
export const LIST_ADM_PRODUCT_DETAIL = `${BASE_URL}/api/admin/product/list-admin-product-detail`;
export const UPDATE_ADM_PRODUCT = `${BASE_URL}/api/admin/product/update-admin-product-and-detail`;
export const CREATE_ADM_PRODUCT = `${BASE_URL}/api/admin/product/create-admin-product-and-detail`;

// code
export const LIST_CODE = `${BASE_URL}/api/member/code/list-code`;
