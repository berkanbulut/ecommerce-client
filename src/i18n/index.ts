import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enNavbar from "./locales/en/navbar.json";
import enHome from "./locales/en/home.json";
import enProduct from "./locales/en/product.json";
import enCheckout from "./locales/en/checkout.json";
import enCart from "./locales/en/cart.json";
import enOrders from "./locales/en/orders.json";
import enAuth from "./locales/en/auth.json";
import enValidation from "./locales/en/validation.json";
import enToast from "./locales/en/toast.json";
import enErrors from "./locales/en/errors.json";
import enAdmin from "./locales/en/admin.json";

import noCommon from "./locales/no/common.json";
import noNavbar from "./locales/no/navbar.json";
import noHome from "./locales/no/home.json";
import noProduct from "./locales/no/product.json";
import noCheckout from "./locales/no/checkout.json";
import noCart from "./locales/no/cart.json";
import noOrders from "./locales/no/orders.json";
import noAuth from "./locales/no/auth.json";
import noValidation from "./locales/no/validation.json";
import noToast from "./locales/no/toast.json";
import noErrors from "./locales/no/errors.json";
import noAdmin from "./locales/no/admin.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        common: enCommon,
        navbar: enNavbar,
        home: enHome,
        product: enProduct,
        checkout: enCheckout,
        cart: enCart,
        orders: enOrders,
        auth: enAuth,
        validation: enValidation,
        toast: enToast,
        errors: enErrors,
        admin: enAdmin,
      },

      no: {
        common: noCommon,
        navbar: noNavbar,
        home: noHome,
        product: noProduct,
        checkout: noCheckout,
        cart: noCart,
        orders: noOrders,
        auth: noAuth,
        validation: noValidation,
        toast: noToast,
        errors: noErrors,
        admin: noAdmin,
      },
    },

    defaultNS: "common",

    ns: [
      "common",
      "navbar",
      "home",
      "product",
      "checkout",
      "cart",
      "orders",
      "auth",
      "validation",
      "toast",
      "errors",
      "admin",
    ],
  });

export default i18n;
