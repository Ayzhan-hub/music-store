import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import HomeAbout from "../pages/HomeAbout";

import {
  HOME_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  PRODUCTS_PAGE_ROUTE,
  CART_PAGE_ROUTE,
  CHECKOUT_PAGE_ROUTE,
  HOME_ABOUT_PAGE_ROUTE,
} from "./consts";

export const routes = [
  {
    path: HOME_PAGE_ROUTE,
    element: HomePage,
  },
  {
    path: REGISTER_PAGE_ROUTE,
    element: RegisterPage,
  },
  {
    path: LOGIN_PAGE_ROUTE,
    element: LoginPage,
  },
  {
    path: PROFILE_PAGE_ROUTE,
    element: ProfilePage,
  },
  {
    path: PRODUCTS_PAGE_ROUTE,
    element: ProductsPage,
  },
  {
    path: CART_PAGE_ROUTE,
    element: CartPage,
  },
  {
    path: CHECKOUT_PAGE_ROUTE,
    element: CheckoutPage,
  },
  {
    path: HOME_ABOUT_PAGE_ROUTE,
    element: HomeAbout,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];
