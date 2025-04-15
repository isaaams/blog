import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        {message && <div className="mt-3 text-center text-danger">{message}</div>}
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/signup" className="btn btn-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;