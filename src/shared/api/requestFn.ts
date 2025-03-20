import axios, { AxiosRequestConfig } from "axios";

interface IRequestFnParams<T> {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  data?: T;
  needAuth?: boolean;
  headers?: { [key: string]: string };
}

export const requestFn = async <T, R>({
  url,
  method = "get",
  data,
  needAuth = true,
  headers = {},
}: IRequestFnParams<T>): Promise<R> => {
  let token: string | null = needAuth
    ? localStorage.getItem("accessToken")
    : null;

  if (needAuth && !token) {
    throw new Error("No token");
  }

  // console.log("requestFn: ", url);
  // console.log("meghod:", method);
  // console.log("token: ", token);
  // console.log("data: ", data);
  // console.log("needAuth: ", needAuth);
  // console.log("headers: ", headers);
  const axiosConfig: AxiosRequestConfig = {
    url,
    method,
    data,
    timeout: 5000,
    headers: {
      ...headers,
      ...(needAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const res = await axios(axiosConfig);
  return res.data;
};
