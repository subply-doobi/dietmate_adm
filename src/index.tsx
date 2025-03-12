import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./shared/styles/font.css";

import { RouterProvider, createHashRouter } from "react-router-dom";
import Order from "./screens/order/Order";
import Product from "./screens/product/Product";
import { Provider } from "react-redux";
import { store } from "./app/reduxStore/reduxStore";
import { QueryClientProvider } from "@tanstack/react-query";
import KakaoLogin from "./screens/login/KakaoLogin";
import { queryClient } from "./app/reactQueryStore/reactQueryStore";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "product",
        element: <Product />,
      },
    ],
  },
  {
    path: "kakaoLogin",
    element: <KakaoLogin />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* redux store */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
