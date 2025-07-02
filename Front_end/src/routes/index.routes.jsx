import { useRoutes } from "react-router-dom";

import DefaultLayout from "../components/layouts/default";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Users from "../pages/Users";

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
        path: "/users",
        element: <Users />,
      },
    ],
  },
];

export default function AppRoutes() {
  const elements = useRoutes(routes);
  return elements;
}
