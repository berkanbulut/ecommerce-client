import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import type { AppDispatch } from "../../../app/api/store";
import { login } from "../authSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("auth");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error(t("errors.missingCredentials"));
      return;
    }

    try {
      const result = await dispatch(login({ identifier, password })).unwrap();

      const isAdmin = result.authorities.includes("ROLE_ADMIN");

      const isEditor =
        result.authorities.includes("category:create") &&
        result.authorities.includes("category:update");

      toast.success(t("success.login"));

      navigate(isAdmin || isEditor ? "/admin" : "/");
    } catch {
      toast.error(t("errors.loginFailed"));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card glass-card p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">{t("login.title")}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("login.identifierLabel")}</label>

            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              type="text"
              className="form-control"
              placeholder={t("login.identifierPlaceholder")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("login.passwordLabel")}</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder={t("login.passwordPlaceholder")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {t("login.submit")}
          </button>

          <p className="text-center mt-3 mb-0">
            {t("login.noAccount")}{" "}
            <Link to="/register">{t("login.registerLink")}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
