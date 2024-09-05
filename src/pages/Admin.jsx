import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const plans = {
  Standard: [100, 200, 300],
  Gold: [500, 800, 1000],
  Diamond: [1500, 2000, 3000],
  Emerald: [4000, 5000, 6000],
};

const Admin = ({ socket }) => {
  const socketRef = useRef(socket);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = socket; // Update the ref with the latest socket instance
  }, [socket]);
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [selectedAmount, setSelectedAmount] = useState(plans["Standard"][0]);
  const [investmentEmail, setInvestmentEmail] = useState("");
  const [lightningAddress, setlightningAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [balanceEmail, setBalanceEmail] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatEmail, setChatEmail] = useState("");
  const [chats, setChats] = useState([]);
  const [isChatReady, setIsChatReady] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateInvestment = () => {
    console.log(
      "Investment updated:",
      selectedPlan,
      "Amount:",
      selectedAmount,
      "for user:",
      investmentEmail
    );
    setInvestmentEmail("");
    setSelectedPlan("Standard");
    setSelectedAmount(plans["Standard"][0]);
  };

  useEffect(() => {
    setIsChatReady(false);
  }, []);

  const handleUpdateBalance = () => {
    console.log("Balance updated:", balance, "for user:", balanceEmail);
    setBalance("");
    setBalanceEmail("");
  };

  const handleUpdateEmail = () => {
    console.log(
      "Lightning Address updated for user:",
      email,
      "to:",
      lightningAddress
    );
    setEmail("");
    setlightningAddress("");
  };
  const userEmail = localStorage.getItem("email");

  const handleCheckChat = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin_messages`, {
        userEmail,
      });
      if (response.status === 404) {
        setIsChatReady(false);
      }
      console.log(response);
      if (response.status === 200) {
        setIsChatReady(true);
        response.data.allMessages.forEach((message) =>
          setChats((prevChats) => [...prevChats, message])
        );
        console.log(response.data.allMessages);
      }
    } catch (err) {
      if (err.status === 404) {
        setIsChatReady(false);
      } else {
        console.log(err);
        toast.error("An error occoured", { theme: "dark" });
      }
    }
  };
  const sendAdminMessage = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/new_admin_message`, {
        message: message,
        recipientEmail: chatEmail,
      });
      console.log(response);
      if (response.status === 400) {
        toast.error("An error occoured", { theme: "dark" });
      }
    } catch (err) {
      toast.error("An error occoured", { theme: "dark" });
      console.log(err);
    } finally {
      setMessage("");
    }
  };
  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log(data);
      setChats((prevChats) => [...prevChats, data]);
    };
    socket.on("adminMessage", handleNewMessage);
    return () => {
      socket.off("adminMessage", handleNewMessage);
    };
  }, [socket]);
  useEffect(() => {
    if (isChatModalOpen) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop =
            messagesEndRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [isChatModalOpen, chats]);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-lg mx-auto space-y-12">
        {/* Update Balance Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">Update Balance</p>
          <input
            placeholder="New balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
          />
          <input
            placeholder="Email for user"
            value={balanceEmail}
            onChange={(e) => setBalanceEmail(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
          />
          <button
            onClick={handleUpdateBalance}
            className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Update Balance
          </button>
        </div>

        {/* Update Investment Plan Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">Update Investment Plan</p>
          <label className="block mb-4">
            <span className="block mb-2">Select Investment Plan</span>
            <select
              value={selectedPlan}
              onChange={(e) => {
                setSelectedPlan(e.target.value);
                setSelectedAmount(plans[e.target.value][0]);
              }}
              className="w-full p-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
            >
              {Object.keys(plans).map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4">
            <span className="block mb-2">Select Amount</span>
            <div className="space-y-2">
              {plans[selectedPlan].map((amount) => (
                <label key={amount} className="flex items-center">
                  <input
                    type="radio"
                    value={amount}
                    checked={selectedAmount === amount}
                    onChange={() => setSelectedAmount(amount)}
                    className="mr-2"
                  />
                  {amount} USD
                </label>
              ))}
            </div>
          </label>

          <input
            placeholder="Email for user"
            value={investmentEmail}
            onChange={(e) => setInvestmentEmail(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
          />

          <button
            onClick={handleUpdateInvestment}
            className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-500 transition duration-300"
          >
            Update Investment Plan
          </button>
        </div>

        {/* Update Email Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">Update Lightning Address</p>
          <input
            placeholder="New Lightning Address"
            value={lightningAddress}
            onChange={(e) => setlightningAddress(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
          />
          <button
            onClick={handleUpdateEmail}
            className="w-full py-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition duration-300"
          >
            Update Lightning Address
          </button>
        </div>

        {/* Live Chat Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-4">Live Chat</p>
          <button
            onClick={() => setIsChatModalOpen(true)}
            className="w-full py-3 bg-yellow-600 rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Open Live Chat
          </button>
        </div>

        {/* Chat Email Modal */}
        {isChatModalOpen && !isChatReady && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">
                Enter User Email for Chat
              </h2>
              <input
                placeholder="Email"
                value={chatEmail}
                onChange={(e) => setChatEmail(e.target.value)}
                className="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleCheckChat}
                  className="py-2 px-4 bg-green-600 rounded-lg hover:bg-green-500 transition duration-300"
                >
                  Check Chat
                </button>
                <button
                  onClick={() => setIsChatModalOpen(false)}
                  className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Screen Modal */}
        {isChatModalOpen && isChatReady && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">
                Chat with {chatEmail}
              </h2>
              <div
                className="bg-gray-700 p-4 rounded-lg h-48 overflow-y-scroll mb-4"
                ref={messagesEndRef}
              >
                <p className="text-sm text-gray-400">
                  [Chat history with {chatEmail} will appear here...]
                  {chats.length > 0 &&
                    chats.map((chat, index) => (
                      <p className="text-gray-300" key={index}>
                        {chat.sender === "You"
                          ? "Client: " + chat.message
                          : "You: " + chat.message}
                      </p>
                    ))}
                </p>
              </div>
              <input
                placeholder="Type a message..."
                className="w-full p-4 mb-4 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
                  onClick={sendAdminMessage}
                >
                  Send
                </button>
                <button
                  onClick={() => setIsChatModalOpen(false)}
                  className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
