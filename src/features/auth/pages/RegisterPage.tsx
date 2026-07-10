import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { register, resetAuthState } from "../authSlice";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("auth");

  const { error, user } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordMatched = password === confirmPassword;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      toast.success(t("success.register"));

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      dispatch(resetAuthState());
      navigate("/login");
    }
  }, [user, navigate, dispatch, t]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordMatched) {
      toast.error(t("errors.passwordMismatch"));
      return;
    }

    dispatch(register({ username, email, password }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="card glass-card p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">{t("register.title")}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("register.nameLabel")}</label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              placeholder={t("register.namePlaceholder")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("register.emailLabel")}</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder={t("register.emailPlaceholder")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("register.passwordLabel")}</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder={t("register.passwordPlaceholder")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              {t("register.confirmPasswordLabel")}
            </label>

            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder={t("register.confirmPasswordPlaceholder")}
            />
          </div>

          <button
            disabled={!isPasswordMatched}
            type="submit"
            className="btn btn-primary w-100"
          >
            {t("register.submit")}
          </button>

          <p className="text-center mt-3 mb-0">
            {t("register.haveAccount")}{" "}
            <Link to="/login" className="text-decoration-none">
              {t("register.loginLink")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
