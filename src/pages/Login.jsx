import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingin, setlogginin] = useState(false);
  const [toastId, setToastId] = useState(null); // Track the toast ID
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setlogginin(true);

    // Show initial toast and keep its ID
    const id = toast.info("Logging in...", { autoClose: false, type: "info" });
    setToastId(id);

    try {
      const response = await axios.post(`${BASE_URL}/logins`, {
        email,
        password,
      });

      if (response.status !== 200) {
        toast.update(id, {
          render: "Network error...",
          type: "error",
          autoClose: 3000,
        });
        return;
      }

      const resp2 = await response.data;

      if (response.status === 200) {
        toast.update(id, {
          render: "Login Successful",
          type: "success",
          autoClose: 3000,
        });
        localStorage.setItem("token", resp2.token);
        const decodeToken = jwt_decode(resp2.token);
        localStorage.setItem("balance", decodeToken.userExists.balance);
        localStorage.setItem("plan", decodeToken.userExists.plan);
        localStorage.setItem("amount", decodeToken.userExists.amount);
        localStorage.setItem(
          "transactions",
          decodeToken.userExists.transactions
        );
        localStorage.setItem("userId", decodeToken.userExists._id);
        localStorage.setItem("email", decodeToken.userExists.email);
        console.log("Decoded Token: ", decodeToken);
        console.log("Resp2.token: ", resp2.token);
        navigate("/home");
      } else if (response.status === 404) {
        toast.update(id, {
          render: "No matching credentials",
          type: "error",
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: "An error occurred",
          type: "error",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.status === 404) {
        toast.update(id, {
          render: "No matching credentials",
          type: "error",
          autoClose: 3000,
        });
      } else {
        toast.update(id, {
          render: "An error occurred",
          type: "error",
          autoClose: 3000,
        });
      }
    } finally {
      setlogginin(false);
    }
  };

  return (
    <div className="text-white bg-darkGreen min-h-screen flex items-center justify-center px-5 pb-20">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-white mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
