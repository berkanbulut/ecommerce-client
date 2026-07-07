import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/api/store";
import { register, resetAuthState } from "../authSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/api/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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
      toast.success("Register successful");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      dispatch(resetAuthState());
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordMatched) return;
    dispatch(register({ username, email, password }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="card shadow-sm border-0 p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">Create Account</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Confirm password"
            />
          </div>

          {/* Button */}
          <button
            disabled={!isPasswordMatched}
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>

          {/* Login link */}
          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
