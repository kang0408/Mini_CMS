import { useRoutes } from "react-router-dom";

import DefaultLayout from "../components/layouts/default";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products/Products";
import ProductCreate from "../pages/Products/Create";
import ProductUpdate from "../pages/Products/Update";
import Users from "../pages/Users/Users";
import UserCreate from "../pages/Users/Create";
import UserUpdate from "../pages/Users/Update";

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
        path: "/products/edit/:id",
        element: <ProductUpdate />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/create",
        element: <UserCreate />,
      },
      {
        path: "/users/edit/:id",
        element: <UserUpdate />,
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
