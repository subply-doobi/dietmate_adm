import { useMutation, useQuery } from "@tanstack/react-query";
import { IQueryConfig } from "../types/config";
import { LIST_ORDER, LIST_ORDER_DETAIL_ALL } from "../keys";
import { requestFn } from "../requestFn";
import {
  GET_ADM_ORDER_DETAIL_ALL,
  LIST_ADM_ORDER,
  UPDATE_ADM_ORDER_RESULT,
} from "../urls";
import { IOrder, IOrderedProduct } from "../types/order";
import { queryClient } from "../../../app/reactQueryStore/reactQueryStore";

interface IListOrderParams {
  resultStatusCd?: string;
  startDate?: string;
  endDate?: string;
  searchText?: string;
}
export const useListAdmOrder = (config: IQueryConfig & IListOrderParams) => {
  const enabled = config?.enabled;

  // parameter
  const resultStatusCd = config.resultStatusCd || "";
  const startDate = config.startDate || "";
  const endDate = config.endDate || "";
  const searchText = config.searchText || "";

  return useQuery({
    queryKey: [LIST_ORDER],
    queryFn: () =>
      requestFn<any, IOrder[]>({
        url: `${LIST_ADM_ORDER}?resultStatusCd=${resultStatusCd}&startDate=${startDate}&endDate=${endDate}&searchText=${searchText}`,
      }),
    enabled,
  });
};

export const useUpdateAdmOrderResult = () => {
  return useMutation({
    mutationFn: ({
      orderNo,
      resultStatusCd,
    }: {
      orderNo: string;
      resultStatusCd: string;
    }) =>
      requestFn<any, any>({
        url: `${UPDATE_ADM_ORDER_RESULT}?orderNo=${orderNo}&statusCd=${resultStatusCd}`,
        method: "post",
      }),
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: [LIST_ORDER] });
      // queryClient.invalidateQueries({
      //   queryKey: [LIST_ORDER_DETAIL_ALL, variables.orderNo],
      // });
    },
  });
};

export const useListAdmOrderDetailAll = (
  config: IQueryConfig & { orderNo: string }
) => {
  const enabled = config?.enabled;
  const orderNo = config.orderNo;
  return useQuery({
    queryKey: [LIST_ORDER_DETAIL_ALL, orderNo],
    queryFn: () =>
      requestFn<any, IOrderedProduct[]>({
        url: `${GET_ADM_ORDER_DETAIL_ALL}/${orderNo}`,
      }),
    enabled,
  });
};
