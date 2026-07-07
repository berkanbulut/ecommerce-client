import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { AppDispatch, RootState } from "../../src/app/api/store";

import { logout } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import { changeLanguage } from "../features/language/languageSlice";
import {
  clearCartLocal,
  handleGetCart,
} from "../features/storefront/shared/cart/cartSlice";

import { supportedLanguages } from "../i18n/language";
import type { LanguageCode } from "../i18n/language";

function StoreFrontLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { t } = useTranslation("navbar");

  const { theme } = useSelector((state: RootState) => state.theme);
  const { language } = useSelector((state: RootState) => state.language);

  const { username, accessToken, authorities } = useSelector(
    (state: RootState) => state.auth,
  );

  const { cart } = useSelector((state: RootState) => state.cartSliceReducer);

  const isAdmin = authorities.includes("ROLE_ADMIN");
  const isEditor = authorities.includes("ROLE_EDITOR");
  const isAuthenticated = !!accessToken;
  const cartCount = cart?.totalItems ?? 0;

  const currentLanguage =
    supportedLanguages.find((lang) => lang.code === language) ??
    supportedLanguages[0];

  useEffect(() => {
    if (accessToken) {
      dispatch(handleGetCart());
    }
  }, [dispatch, accessToken]);

  const handleLanguageChange = (languageCode: LanguageCode) => {
    dispatch(changeLanguage(languageCode));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(clearCartLocal());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column app-shell">
      <nav className="glass-navbar app-navbar">
        <Link to="/" className="app-navbar-brand text-decoration-none">
          <span className="app-logo-icon">
            <i className="bi bi-bag"></i>
          </span>

          <span>E-Commerce</span>
        </Link>

        <div className="app-navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `app-nav-link ${isActive ? "active" : ""}`
            }
          >
            {t("home")}
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `app-nav-link ${isActive ? "active" : ""}`
            }
          >
            {t("shop")}
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `app-nav-link ${isActive ? "active" : ""}`
              }
            >
              {t("orders")}
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `app-nav-link ${isActive ? "active" : ""}`
              }
            >
              {t("admin")}
            </NavLink>
          )}

          {isEditor && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `app-nav-link ${isActive ? "active" : ""}`
              }
            >
              {t("editor")}
            </NavLink>
          )}
        </div>

        <div className="app-navbar-actions">
          <button
            type="button"
            className="app-icon-button"
            onClick={() => dispatch(toggleTheme())}
            title={t("toggleTheme")}
          >
            <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`} />
          </button>

          <div className="dropdown">
            <button
              className="app-icon-button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              title={t("language")}
            >
              {currentLanguage.flag}
            </button>

            <ul className="dropdown-menu dropdown-menu-end glass-card">
              {supportedLanguages.map((lang) => (
                <li key={lang.code}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="me-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/cart" className="app-icon-button position-relative">
            <i className="bi bi-cart3"></i>

            {cartCount > 0 && (
              <span className="app-cart-badge">{cartCount}</span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <div className="app-user-chip">
              <span className="app-user-avatar">
                {username?.charAt(0).toUpperCase() ?? "U"}
              </span>

              <span className="app-user-name">{username}</span>

              <button
                type="button"
                className="app-logout-button"
                onClick={handleLogout}
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="app-auth-actions">
              <NavLink to="/login" className="app-nav-link">
                {t("login")}
              </NavLink>

              <NavLink to="/register" className="btn btn-dark btn-sm">
                {t("register")}
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="app-footer mt-auto">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <h5 className="fw-bold mb-1">MyStore</h5>
              <p className="text-muted mb-0">{t("footerDescription")}</p>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <span className="text-muted small">
                © 2026 MyStore. {t("allRightsReserved")}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StoreFrontLayout;
