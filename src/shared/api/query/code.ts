import { useQuery } from "@tanstack/react-query";
import { IQueryConfig } from "../types/config";
import { LIST_CODE } from "../urls";
import { requestFn } from "../requestFn";
import { ICode } from "../types/code";

export const useListCode = (config: IQueryConfig & { code: string }) => {
  const enabled = config?.enabled;
  const code = config.code;
  return useQuery({
    queryKey: [LIST_CODE],
    queryFn: () =>
      requestFn<any, ICode>({
        url: `${LIST_CODE}/${code}`,
      }),
    initialData: [
      { cd: "SP012001", cdNm: "판매중" },
      { cd: "SP012002", cdNm: "재고없음" },
      { cd: "SP012003", cdNm: "영구삭제" },
    ],
    enabled,
  });
};
