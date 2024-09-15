import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import jwt_decode from 'jwt-decode'

const Register = () => {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState("+1");  // Pre-fill with +1
    const [password, setPassword] = useState('');
    const [logginin, setLogginin] = useState(false);
    const [toastId, setToastId] = useState(null); // Track the toast ID
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLogginin(true);
        
        // Show initial toast and keep its ID
        const id = toast.info("Logging in...", {autoClose: false, type: 'info'});
        setToastId(id);

        // Remove +1 from the number before sending
        const unformattedNumber = number.startsWith("+1") ? number.slice(2) : number;

        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("number", unformattedNumber);
        formdata.append("password", password);

        try {
            const response = await fetch(`${BASE_URL}/signups`, {
                method: "POST",
                body: formdata,
            });

            if (!response.ok) {
                toast.update(id, { render: "Network error...", type: 'error', autoClose: 3000 });
                return;
            }

            const resp2 = await response.json();

            if (resp2.status === 200) {
                toast.update(id, { render: "Registration Successful", type: 'success', autoClose: 3000 });
                localStorage.setItem("token", resp2.token);
                const decodeToken = jwt_decode(resp2.token)
                localStorage.setItem("balance", decodeToken.balance)
                localStorage.setItem("plan", decodeToken.plan)
                localStorage.setItem("amount", decodeToken.amount)
                console.log("Decoded Token: ", decodeToken)
                console.log("Resp2.token: ", resp2.token)
                navigate("/home");
            } else if (resp2.status === 404) {
                toast.update(id, { render: "No matching credentials", type: 'error', autoClose: 3000 });
            } else {
                toast.update(id, { render: "An error occurred", type: 'error', autoClose: 3000 });
            }
        } catch (error) {
            console.log("error: ", error);
            toast.update(id, { render: "An error occurred", type: 'error', autoClose: 3000 });
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
                </form>
                <p className="text-white mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
