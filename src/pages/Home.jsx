import React, { useState, useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { CgCreditCard } from "react-icons/cg";
import { GoEye } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";
import Transactions from "../components/Transactions";
import Footer from "../components/Footer";
import jwt_decode from 'jwt-decode'
import { toast } from "react-toastify";
import { User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import Testimony from "../components/Testimony";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plan, setPlan] = useState('');
    const [decodedToken, setdecodedToken] = useState(null)
    const [amount, setAmount] = useState('');
    const [showModal, setshowModal] = useState(false)
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('');
    const p = localStorage.getItem("plan")
    const a = localStorage.getItem('amount')
    const [investment, setinvestment] = useState([])
    const [email, setemail] = useState("")
    const balance = localStorage.getItem('balance')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem("token");
    
            // Decode the JWT to get the email
            const decoded = jwt_decode(token);
            setemail(decoded.email);
    
            setLoading(true); // Start loading
    
            // Prepare form data for both requests
            const formdata = new FormData();
            formdata.append('email', decoded.email);
    
            try {
                // Fetch the balance
                const balanceResponse = await fetch(`${BASE_URL}/get_balance`, {
                    method: 'POST',
                    body: formdata
                });
    
                // Handle balance response
                if (balanceResponse.ok) {
                    const balanceData = await balanceResponse.json();
                    if (balanceData.status === 200) {
                        localStorage.setItem("balance", balanceData.balance);
                    } else {
                        toast.error(balanceData.message || "No balance found", { theme: 'dark' });
                    }
                } else {
                    toast.error("Error fetching balance", { theme: 'dark' });
                }
    
                // Fetch the investment plan and amount
                const investResponse = await fetch(`${BASE_URL}/getinvestmentdetails`, {
                    method: 'POST',
                    body: formdata
                });
    
                // Handle investment plan response
                if (investResponse.ok) {
                    const investData = await investResponse.json();
                    if (investData.status === 200) {
                        localStorage.setItem("plan", investData.plan);
                        localStorage.setItem("amount", investData.amount);
    
                        // Update the state with the fetched plan and amount
                        const investm = [{
                            "plan": investData.plan,
                            "amount": investData.amount
                        }];
                        setinvestment(investm);
                    } else {
                        toast.error(investData.message || "No investment details found", { theme: 'dark' });
                    }
                } else {
                    toast.error("Error fetching investment details", { theme: 'dark' });
                }
    
            } catch (error) {
                console.error("Error fetching details:", error);
                toast.error("An error occurred while fetching details", { theme: 'dark' });
            } finally {
                setLoading(false); // Stop loading
            }
        };
    
        fetchDetails();
    }, [email]);
    

    const showM = () => setshowModal(true);
    const hideM = () => setshowModal(false)

    const openModal = () => setIsModalOpen(true); 
    const closeModal = () => setIsModalOpen(false);

    

    const plans = {
        Standard: [100, 200, 300],
        Gold: [500, 800, 1000],
        Diamond: [1500, 2000, 3000],
        Emerald: [4000, 5000, 6000],
    };

    const paymentMethods = ['Cashapp', 'Zelle', 'Bitcoin', 'Apple Pay'];
    const sendSMS = () => {
        // Replace with the number you want to send the SMS to
        const phoneNumber = "5512275014";
        
        // Optional: Add a default message
        const message = `Hello, I am contacting this agent to complete my investment on ${plan} plan with the sum of ${amount}. I am currently paying through ${paymentMethod} \n \n My email is: ${email}`;
        
        // Form the SMS URL
        const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    
        // Redirect to the SMS app
        window.location.href = smsUrl;
    };
    

    const clickSubmit = () => {
        if (paymentMethod === "Cashapp" || paymentMethod === "Zelle" || paymentMethod === "Apple Pay") {
            console.log("payment method");
            setshowModal(true);
        } else {
            navigate("/bitcoin", { 
                state: { amount: amount, plan: plan, email: email }
            });
        }
    }

    const gotoAgent = async () => {
        setshowModal(true)
    }
    

    return (
        <div className="text-white bg-darkGreen min-h-screen">
            <div className="bg-darkGreen py-3 px-4 pb-6">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <BiMenu color="white" size={24} />
                    </div>
                    <div>
                        <p>Forex Trading Forum</p>
                    </div>
                    <div>
                        <img src="./logo.jpg" alt="Logo PNG" className="w-10 h-10 rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col items-center border border-white bg-white p-4 rounded-lg mt-5">
                    <div className="w-full flex flex-row items-left">
                        <p className="text-lg text-left text-gray-600">Total Balance</p>
                    </div>
                    <div className="border-b border-gray-500 w-full flex flex-row pb-5 items-center justify-between">
                        <p className="text-2xl font-bold text-black">${balance ? balance : "2,340.00"}</p>
                        <GoEye color="black" size={26} />
                    </div>
                    <div className="flex flex-row items-center justify-between w-full space-x-3 mt-4">
                        {[
                            { icon: <BsArrowUp color="white" size={21} />, text: "Deposit", action: openModal },
                            { icon: <BsArrowDown color="white" size={21} />, text: "Withdraw", action: gotoAgent},
                            { icon: <CgCreditCard color="white" size={21} />, text: "Cards", action: gotoAgent },
                            { icon: <LuArrowUpDown color="white" size={21} />, text: "Exchange", action: gotoAgent },
                        ].map((item, index) => (
                            <div key={index} className="w-1/4 flex flex-col items-center" onClick={item.action}>
                                <div className="border border-darkGreen bg-darkGreen p-2 rounded-lg flex items-center justify-center w-11 h-11">
                                    {item.icon}
                                </div>
                                <p className="text-black mt-1">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 w-full py-6 px-4 flex-1">
                <div className="flex flex-row items-center justify-between space-x-3">
                    <div className="border-2 border-white bg-white w-1/2 h-20 rounded-lg p-2 pt-3">
                        <p className="text-gray-500 text-[12px]">Current Balance</p>
                        <p className="text-darkGreen text-xl pt-3">${balance ? balance : "null"}</p>
                    </div>
                    <div className="border-2 border-white bg-white w-1/2 h-20 rounded-lg p-2 pt-3">
                        <p className="text-gray-500 text-[12px]">Current Investment Plan</p>
                        <p className="text-blue-900 text-xl pt-3">{p === "null" ? 'None' : p} : {a}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between space-x-3 mt-4">
                    <div className="border-2 border-white bg-white w-1/2 h-20 rounded-lg p-2">
                        <p className="text-gray-500 text-[12px]">Amount Made From Website (/m)</p>
                        <p className="text-darkGreen text-xl">$30,439.23</p>
                    </div>
                    <div className="border-2 border-white bg-white w-1/2 h-20 rounded-lg p-2 pt-3">
                        <p className="text-gray-500 text-[12px]">Highest Investor Balance</p>
                        <p className="text-blue-900 text-xl pt-3">$12,349.32</p>
                    </div>
                </div>
            </div>
            <Transactions />
            <Testimony/>
            <Footer openModal={openModal} />

            {/* Show Modal For Contacting Agent */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 flex justify-center items-center max-h-70 p-10">
                    <div className="fixed top-10 right-5" onClick={() => setshowModal(false)}>
                        <X color="gray" size={25}/>
                    </div>
                    <div className="space-y-5">
                        <div className="text-center" style={{ fontFamily: "Ubuntu"}}>
                            <p>To complete this payment, contact our agent below</p>
                        </div>
                        <div className="flex flex-row items-center space-x-2 justify-center rounded-lg text-center py-3 bg-green-900 text-white group hover:bg-green-800 transition duration-300 ease-in-out" onClick={sendSMS}>
                            <User color="white" size={25}/>
                            <p>Contact An Agent</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end">
                    <div className="bg-white w-full md:w-1/3 p-4 rounded-t-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Deposit Details</h2>
                            <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 text-2xl">&times;</button>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Choose a Plan</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded text-gray-600"
                                    value={plan}
                                    onChange={(e) => setPlan(e.target.value)}
                                >
                                    <option value="">Select a plan</option>
                                    {Object.keys(plans).map((plan) => (
                                        <option key={plan} value={plan}>{plan}</option>
                                    ))}
                                </select>
                            </div>
                            {plan && (
                                <div>
                                    <label className="block text-gray-700">Enter an Amount</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded text-gray-600"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    >
                                        <option value="">Select an amount</option>
                                        {plans[plan].map((amount) => (
                                            <option key={amount} value={amount}>{amount}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label className="block text-gray-700">Select Payment Method</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded text-gray-600"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="">Select a method</option>
                                    {paymentMethods.map((method) => (
                                        <option key={method} value={method}>{method}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-darkGreen text-white p-2 rounded text-gray-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    clickSubmit();
                                    closeModal();
                                }}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
