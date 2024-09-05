import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import jwtDecode from "jwt-decode";
import axios from "axios";
const Register = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("+1"); // Pre-fill with +1
  const [password, setPassword] = useState("");
  const [logginin, setLogginin] = useState(false);
  const [toastId, setToastId] = useState(null); // Track the toast ID
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLogginin(true);
  
    // Show initial toast and keep its ID
    const id = toast.info("Logging in...", { autoClose: false, type: "info" });
    setToastId(id);
  
    // Remove +1 from the number before sending
    const unformattedNumber = number.startsWith("+1") ? number.slice(2) : number;
  
    try {
      // Make the fetch request with unformatted number
      const response = await fetch(`${BASE_URL}/signups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          email,
          password,
          number: unformattedNumber, // Send the unformatted number
        }),
      });
  
      // Check if the status is not 201 (created)
      if (response.status !== 201) {
        toast.update(id, {
          render: "Network error...",
          type: "error",
          autoClose: 3000,
        });
        return;
      }
  
      // Parse the response data
      const resp2 = await response.json(); // Use response.json() to parse
      console.log({ response, resp2 });
  
      if (response.status === 201) {
        toast.update(id, {
          render: "Registration Successful",
          type: "success",
          autoClose: 3000,
        });
  
        // Handle token and localStorage logic
        localStorage.setItem("token", resp2.token);
        
        const decodeToken = jwtDecode(resp2.token);
        console.log("Decoded Token: ", decodeToken);
  
        localStorage.setItem("balance", decodeToken.balance);
        localStorage.setItem("plan", decodeToken.plan);
        localStorage.setItem("amount", decodeToken.amount);
        localStorage.setItem("transactions", decodeToken.transactions);
        localStorage.setItem("userId", decodeToken._id);
        localStorage.setItem("email", decodeToken.email);
  
        // Navigate to the home page
        navigate("/home");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.update(id, {
        render: "An error occurred",
        type: "error",
        autoClose: 3000,
      });
    } finally {
      setLogginin(false);
    }
  };
  

  const handleNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and make sure it starts with +1
    if (/^\+?[0-9]*$/.test(value) && value.startsWith("+1")) {
      setNumber(value);
    }
  };

  return (
    <div className="text-white bg-darkGreen min-h-screen flex items-center justify-center px-5 pb-20">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
            <label className="block text-white">Phone Number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={number}
              onChange={handleNumberChange}
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
            Register
          </button>
        </form>
        <p className="text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
