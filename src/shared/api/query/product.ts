import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_PRODUCT, LIST_PRODUCT, LIST_PRODUCT_DETAIL } from "../keys";
import { requestFn } from "../requestFn";
import { IProduct, IProductDetail } from "../types/product";
import {
  CREATE_ADM_PRODUCT,
  GET_ADM_PRODUCT,
  LIST_ADM_PRODUCT,
  LIST_ADM_PRODUCT_DETAIL,
  UPDATE_ADM_PRODUCT,
} from "../urls";
import { IQueryConfig } from "../types/config";
import { IProductFilterState } from "../../../features/filter/productFilterSlice";
import { categoryCdByBtnNm, statusCdByBtnNm } from "../../util/converter";
import { queryClient } from "../../../app/reactQueryStore/reactQueryStore";

export const useListAdmProduct = (
  config?: IQueryConfig & { filterState: IProductFilterState }
) => {
  const enabled = config?.enabled;
  const filterState = config?.filterState;
  const productStatus = filterState?.productStatus;
  const category = filterState?.category;
  const platformNm = filterState?.platformNm;

  const selectedStatus = productStatus
    ? Object.keys(productStatus).find((key) => {
        const productStatusKey =
          key as keyof IProductFilterState["productStatus"];
        return productStatus[productStatusKey] === true;
      }) || ""
    : "";

  const selectedCategory = category
    ? Object.keys(category).find((key) => {
        const categoryKey = key as keyof IProductFilterState["category"];
        return category[categoryKey] === true;
      }) || ""
    : "";

  // const selectedPlatformNm = platformNm
  //   ? Object.keys(platformNm).find((key) => {
  //       const platformNmKey = key as keyof IProductFilterState["platformNm"];
  //       return platformNm[platformNmKey] === true;
  //     }) || ""
  //   : "";
  const searchText = filterState?.search || "";

  const statusCd = statusCdByBtnNm[selectedStatus];
  const categoryCd = categoryCdByBtnNm[selectedCategory];

  return useQuery({
    queryKey: [LIST_PRODUCT],
    queryFn: () =>
      requestFn<any, IProduct[]>({
        url: `${LIST_ADM_PRODUCT}?statusCd=${statusCd}&categoryCd=${categoryCd}&searchText=${searchText}`,
      }),
    enabled,
  });
};

export const useGetAdmProduct = (
  config: IQueryConfig & { productNo: string }
) => {
  const enabled = config?.enabled;
  const productNo = config.productNo;
  return useQuery({
    queryKey: [GET_PRODUCT, productNo],
    queryFn: () =>
      requestFn<any, IProduct>({
        url: `${GET_ADM_PRODUCT}?productNo=${productNo}`,
      }),
    enabled,
  });
};

export const useListAdmProductDetail = (
  config: IQueryConfig & { productNo: string }
) => {
  const productNo = config.productNo;
  const enabled = config?.enabled;
  return useQuery({
    queryKey: [LIST_PRODUCT_DETAIL, productNo],
    queryFn: () =>
      requestFn<any, IProductDetail[]>({
        url: `${LIST_ADM_PRODUCT_DETAIL}?productNo=${productNo}`,
      }),
    enabled,
  });
};

export const useCreateAdmProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      requestFn<FormData, IProduct>({
        url: CREATE_ADM_PRODUCT,
        method: "put",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (s) => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_DETAIL] });
      console.log("useCreateAdmProduct: onSuccess: ", s);
    },
  });
};
export const useUpdateAdmProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      requestFn<FormData, IProduct>({
        url: UPDATE_ADM_PRODUCT,
        method: "post",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (s) => {
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [LIST_PRODUCT_DETAIL] });
      console.log("useUpdateAdmProduct: onSuccess: ", s);
    },
  });
};
