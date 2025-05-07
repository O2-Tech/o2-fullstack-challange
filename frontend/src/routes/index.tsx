import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "./dashboard";
import ProductsPage from "./products";
import StockPage from "./stock";
import ReportsPage from "./reports";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

export const productsRoute = createFileRoute("/")({
  component: ProductsPage,
});

export const stockRoute = createFileRoute("/")({
  component: StockPage,
});

export const reportsRoute = createFileRoute("/")({
  component: ReportsPage,
});
