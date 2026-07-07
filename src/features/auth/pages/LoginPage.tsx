import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../app/api/store";
import { login } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Please enter email/username and password");
      return;
    }

    try {
      const result = await dispatch(login({ identifier, password })).unwrap();

      const isAdmin = result.authorities.includes("ROLE_ADMIN");

      const isEditor =
        result.authorities.includes("category:create") &&
        result.authorities.includes("category:update");

      toast.success("Login success");

      if (isAdmin || isEditor) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email or Username</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter email or username"
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
