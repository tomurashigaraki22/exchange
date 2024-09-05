import React from "react";
import { DollarSign, Gift } from "lucide-react";
import Footer from "../components/Footer";
import { Menu } from "lucide-react";
import Header from "../components/Header";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";

function Transactions({ item, fullscreen }) {
  const className = fullscreen ? "hidden" : "flex mb-3";
  const w = !fullscreen
    ? "hidden"
    : "flex flex-row items-center justify-between w-full";
  const userInfo = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (userInfo) {
      try {
        const decoded = jwtDecode(userInfo);
        setTransactions(decoded.transactions || []);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [userInfo]);

  const renderTransaction = (transaction) => {
    let icon, statusColor, statusText;
    switch (transaction.status) {
      case "Success":
        icon = <DollarSign size={30} color="#777" />;
        statusColor = "bg-green-500";
        statusText = "Success";
        break;
      case "Failed":
        icon = <DollarSign size={30} color="#777" />;
        statusColor = "bg-red-500";
        statusText = "Failed";
        break;
      case "Pending":
        icon = <Gift size={30} color="#777" />;
        statusColor = "bg-yellow-500";
        statusText = "Pending";
        break;
      default:
        return null;
    }

    return (
      <li key={transaction._id} className="flex items-center p-4">
        <div className="flex-shrink-0 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-gray-300 font-semibold">{transaction.type}</p>
          <p className="text-gray-400 text-sm">{`${transaction.date} | ${transaction.time}`}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white mb-0">{transaction.amount}</p>
          <p
            className={`text-white text-xs mt-1 ${statusColor} rounded-full px-2 py-1 inline-block`}
          >
            {statusText}
          </p>
        </div>
      </li>
    );
  };
  return (
    <div>
      <div className="p-3 bg-gray-900">
        <div className="flex flex-row items-center justify-between bg-gray-900">
          <div>
            <img
              src="./logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>
            <p className="text-white text-2xl">Forex Trading Forum</p>
          </div>
          <div>
            <Menu color="white" size={24} />
          </div>
        </div>
      </div>
      <div className="mb-10 bg-darkGreen min-h-screen flex flex-col items-center justify-center pb-20">
        <div className={`flex justify-between items-center ${className}`}>
          <h6 className="text-lg font-semibold">Transaction</h6>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            View all
          </a>
        </div>

        <div className="mb-4 w-full px-4 py-5">
          <div className="bg-gray-800 rounded-lg shadow-md w-full lg:w-2/3 xl:w-1/2 mx-auto">
            <div className="p-0">
              <ul className="divide-y divide-gray-700">
                {transactions.length > 0 ? (
                  transactions.map(renderTransaction)
                ) : (
                  <li className="flex items-center p-4 text-gray-400">
                    No transactions found
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Transactions;
