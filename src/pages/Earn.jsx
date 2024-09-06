import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaShare, FaReceipt } from 'react-icons/fa';
import Header from '../components/Header';
import jwt_decode from 'jwt-decode';
import Footer from '../components/Footer';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

function TransactionPage() {
    const [investment, setInvestment] = useState(0);
    const [dailyEarnings, setDailyEarnings] = useState(0);
    const [shares, setShares] = useState(0);
    const [claimed, setClaimed] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading

    const amount = localStorage.getItem("amount");
    const plan = localStorage.getItem("plan");

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const lastVisit = localStorage.getItem('lastVisit') || '';

        if (lastVisit !== today) {
            setShares(0);
            localStorage.setItem('shares', 0);
            localStorage.setItem('lastVisit', today);
        } else {
            const sh = parseInt(localStorage.getItem('shares')) || 0;
            setShares(sh);
        }

        const earnings = (investment * 1.8) / 7;
        setDailyEarnings(earnings);
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const emails = decodedToken.email;
        localStorage.setItem("email", emails);
    }, [investment]);

    useEffect(() => {
        const fetchInvestmentDetails = async () => {
          setLoading(true); // Start loading
          const token = localStorage.getItem('token');
          const decodedToken = jwt_decode(token);
          const emails = decodedToken.email;
          localStorage.setItem("email", emails);
      
          try {
            const response = await fetch(`${BASE_URL}/getinvestmentdetails`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',  // Make sure this is included
              },
              body: JSON.stringify({
                email: emails,  // Send the 'email' data correctly
              }),
            });
      
            // Check if response is not okay
            if (!response.ok) {
              console.log("F: ", response);
              toast.error("Error fetching investment details", { theme: 'dark' });
              return;
            }
      
            // Parse the response data once
            const data = await response.json();
            console.log("Investment Details: ", data);
      
            // Handle success
            if (response.status === 200) {
              localStorage.setItem("plan", data.plan);
              localStorage.setItem("amount", data.amount);
            } else {
              toast.error(data.message || "No investment details found", { theme: 'dark' });
            }
          } catch (error) {
            console.error("Error: ", error);
            toast.error("An error occurred while fetching investment details", { theme: 'dark' });
          } finally {
            setLoading(false); // End loading
          }
        };
      
        fetchInvestmentDetails();
      }, []);
      

    const handleShare = () => {
        if (shares < 20) {
            const message = encodeURIComponent("Hey Friend, this is paying me, all you need to do is share posts on Facebook or Whatsapp and you can withdraw to CashApp or Bank. No personal info needed and you don't pay them anything. Click the link and sign up \n \n https://192.168.43.96:5432/dummyasslink");
            const whatsappUrl = `https://wa.me/?text=${message}`;

            window.open(whatsappUrl, '_blank');

            setTimeout(() => {
                const newShares = shares + 1;
                localStorage.setItem("shares", newShares);
                setShares(newShares);
            }, 2000);
        }
    };

    const handleClaim = () => {
        if (shares === 20) {
            const amuo = (amount * 1.8) / 7;
            add_to_balance(amuo);
            setClaimed(true);
            localStorage.setItem("shares", 0);
        }
    };

    const add_to_balance = async (amount) => {
        setLoading(true); // Start loading
        const formdata = new FormData();
        const em = localStorage.getItem("email");
        formdata.append("email", em);
        formdata.append("amount", amount);

        const toastId = toast.loading("Confirming Task Done...");

        try {
            const response = await fetch(`${BASE_URL}/update_balance`, {
                method: "POST",
                body: formdata
            });

            if (!response.ok) {
                toast.update(toastId, { 
                    render: "Error adding to balance", 
                    type: "error", 
                    isLoading: false, 
                    autoClose: 5000, 
                    closeOnClick: true
                });
                console.log("Error: ", response);
                return;
            }

            toast.update(toastId, { 
                render: "Balance added successfully", 
                type: "success", 
                isLoading: false, 
                autoClose: 5000, 
                closeOnClick: true
            });
            const resp2 = await response.json();
            const amount = parseFloat(resp2.amount);
            const b = parseFloat(localStorage.getItem("balance"));

            const bal = (amount + b).toFixed(2);
            localStorage.setItem("balance", bal);
            window.location.reload();
        } catch (error) {
            toast.update(toastId, { 
                render: "Error adding to balance", 
                type: "error", 
                isLoading: false, 
                autoClose: 5000, 
                closeOnClick: true
            });
            console.error("Error2: ", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <>
            <main className="min-h-screen bg-darkGreen mb-10">
                <div className="mx-auto pt-3 text-white">
                    <Header title={'Tasks'} className="mb-10"/>
                    {loading && (
                        <div className="text-center mt-10">
                            <p className="text-lg text-white">Loading...</p>
                            {/* You can add a spinner here if desired */}
                        </div>
                    )}
                    {!loading && (
                        <div className="pb-10 mt-5">
                            <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center pt-[100px]">
                                <div className="flex justify-between flex-wrap">
                                    <div className="w-full sm:w-1/2 p-2">
                                        <div className="bg-gray-900 p-4 rounded-lg">
                                            <p className="text-gray-500 text-sm">Shares</p>
                                            <p>{shares} / 20</p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 p-2">
                                        <div className="bg-gray-900 p-4 rounded-lg">
                                            <p className="text-gray-500 text-sm">Account Balance</p>
                                            <p>${localStorage.getItem("balance")}</p>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-1/2 p-2">
                                        <div className="bg-gray-900 p-4 rounded-lg">
                                            <p className="text-gray-500 text-sm">Daily Earning</p>
                                            <p>${((amount * 1.8)/7).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    {shares === 20 && !claimed && (
                                        <div className="text-center">
                                            <button onClick={handleClaim} className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-lg mb-2">
                                                <FaWallet size={22} />
                                            </button>
                                            <p className="text-xs">Claim</p>
                                        </div>
                                    )}
                                    {shares < 20 && (
                                        <div className="text-center">
                                            <button onClick={handleShare} className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-lg mb-2">
                                                <FaShare size={22} />
                                            </button>
                                            <p className="text-xs">Share</p>
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <Link to="/transactions" className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-lg mb-2">
                                            <FaReceipt size={22} />
                                        </Link>
                                        <p className="text-xs">My Referrals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {claimed && (
                        <div>
                            <p className="text-center text-green-500">Earnings claimed! Your balance has been updated.</p>
                        </div>
                    )}
                </div>
                <Footer/>
            </main>
        </>
    );
}

export default TransactionPage;
