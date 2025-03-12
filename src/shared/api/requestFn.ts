import axios, { AxiosRequestConfig } from "axios";

interface IRequestFnParams<T> {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  data?: T;
  needAuth?: boolean;
  withCredentials?: boolean;
  headers?: { [key: string]: string };
}

export const requestFn = async <T, R>({
  url,
  method = "get",
  data,
  needAuth = true,
  withCredentials = false,
  headers = {},
}: IRequestFnParams<T>): Promise<R> => {
  let token: string | null = needAuth
    ? localStorage.getItem("accessToken")
    : null;
  console.log("requestFn: ", token);
  if (needAuth && !token) {
    throw new Error("No token");
  }

  // console.log("requestFn: ", url);
  const axiosConfig: AxiosRequestConfig = {
    url,
    method,
    data,
    timeout: 5000,
    headers: {
      ...headers,
      ...(needAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials,
  };

  const res = await axios(axiosConfig);
  return res.data;
};
