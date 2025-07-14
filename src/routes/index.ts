import { createBrowserRouter } from "react-router-dom";
import type { ComponentType } from "react";
import { Dashboard, History } from "../pages";
import { Layout } from "../components/Layout";

export type RouteConfig = {
  path: string;
  element: ComponentType;
  label: string;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "history",
        Component: History,
      },
    ],
  },
]);
