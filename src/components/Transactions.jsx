import React, { useEffect, useState } from "react";
import { DollarSign, Gift } from "lucide-react";
import jwtDecode from "jwt-decode";

function Transactions({ item, fullscreen }) {
  const className = fullscreen ? "hidden" : "flex mb-3";
  const userInfo = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (userInfo) {
      try {
        const decoded = jwtDecode(userInfo);
        setTransactions(decoded.userExists.transactions || []);
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
    <>
      <div className={`flex justify-between items-center ${className}`}>
        <h6 className="text-lg font-semibold">Recent Transactions</h6>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          View all
        </a>
      </div>
      <div className="mb-4">
        <div className="bg-gray-800 rounded-lg shadow-md">
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
    </>
  );
}

export default Transactions;
