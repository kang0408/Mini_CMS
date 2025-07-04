import { useRoutes } from "react-router-dom";

import DefaultLayout from "../components/layouts/default";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products/Products";
import ProductCreate from "../pages/Products/Create";
import Users from "../pages/Users";

import AuthLayout from "../components/layouts/auth";
import Login from "../pages/Login";

const routes = [
  {
    path: "",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/create",
        element: <ProductCreate />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default function AppRoutes() {
  const elements = useRoutes(routes);
  return elements;
}
