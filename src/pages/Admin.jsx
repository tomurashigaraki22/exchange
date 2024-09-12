import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import SimpleChat from "./ChatPage";

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
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpdateInvestment = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/update_user_plan`, {
        newPlan: selectedPlan,
        selectedAmount,
        userEmail: investmentEmail,
      });
      if (response.status === 200) {
        toast.success(response.data.message, { theme: "dark" });
      }
      console.log(response);
    } catch (err) {
      const error = err.response.data.message || "An error occoured";
      toast.error(error, { theme: "dark" });
    }
  };

  useEffect(() => {
    setIsChatReady(false);
  }, []);

  const handleUpdateBalance = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/update_user_balance`, {
        userEmail: balanceEmail,
        newBalance: balance,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message, { theme: "dark" });
      }
    } catch (err) {
      console.log(err);
      const error = err.response.data.message || "An error occoured";
      toast.error(error, { theme: "dark" });
    } finally {
      setBalanceEmail("");
      setBalance("");
    }
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

  const handleCheckChat = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin_messages`, {
        userEmail: chatEmail,
      });
      if (response.status === 200) {
        setIsChatReady(true);
        response.data.allMessages.forEach((message) =>
          setChats((prevChats) => [...prevChats, message])
        );
      }
    } catch (error) {
      const err = error.response.data.message || "An error occoured";
      toast.info(err, { theme: "dark" });
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
    const adminImage = (data) => {
      console.log(data);
      setChats((prevMessages) => [...prevMessages, data]);
    };
    const handleNewMessage = (data) => {
      console.log(data);
      setChats((prevChats) => [...prevChats, data]);
    };
    socket.on("newAdminImage", adminImage);

    socket.on("adminMessage", handleNewMessage);
    return () => {
      socket.off("adminMessage", handleNewMessage);
      socket.off("newAdminImage", adminImage);
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
  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        // Create a FileReader to read the file
        const reader = new FileReader();

        reader.onloadend = async () => {
          // Convert the result to a Base64 string
          const base64String = reader.result.split(",")[1];
          setImageFile(file);
          setSelectedImage(reader.result); // Store the data URL for preview

          // Log the Base64 string
          console.log(base64String);

          // Prepare the data to be sent to the server
          try {
            const response = await axios.post(
              `${BASE_URL}/upload_image_admin`,
              {
                imageBase: base64String,
                senderEmail: chatEmail, // Include other necessary data
              }
            );
            console.log(response.data);
            toast.success("Image uploaded successfully!", {
              theme: "dark",
            });
          } catch (err) {
            const error = err.response.data.message || "An error occurred";
            console.log(err);
            toast.error(error, {
              theme: "dark",
            });
          }
        };

        reader.readAsDataURL(file); // Read the file as a data URL
      }
    }
  };
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
            <div className="bg-gray-800 p-2 rounded-lg shadow-lg w-96 h-4/6 overflow-hidden">
              <section className="flex flex-col h-full max-w-md  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <header className="flex items-center justify-between bg-blue-500 text-white p-4">
                  <div className="flex items-center">
                    <img
                      className="mr-2"
                      src="/logo.jpg"
                      height={24}
                      width={24}
                      alt="Logo"
                    />
                    <span className="text-lg font-semibold">
                      Chat with {chatEmail}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsChatModalOpen(false);
                    }}
                    className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
                  >
                    Close
                  </button>
                </header>

                <ul
                  ref={messagesEndRef}
                  className="flex-1 p-4 overflow-y-auto "
                >
                  {chats.map((chat, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start mb-4 ${
                        chat.sender === "Support"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {chat.sender === "Support" ? (
                        <div className="flex items-start">
                          {chat.image ? (
                            <img
                              src={chat.image}
                              alt="User upload"
                              className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                          ) : (
                            <div className="ml-3 bg-gray-100 p-3 rounded-lg shadow-md">
                              <div className="text-sm font-semibold text-black">
                                You
                              </div>
                              <div className="mt-1 text-gray-700">
                                {chat.message}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-start">
                          {chat.image ? (
                            <img
                              src={chat.image}
                              alt="User upload"
                              className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                          ) : (
                            <div className="ml-3 bg-blue-100 p-3 rounded-lg shadow-md">
                              <div className="text-sm font-semibold text-black">
                                Client
                              </div>
                              <div className="mt-1 text-gray-700">
                                {chat.message}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center p-4 bg-gray-100 border-t border-gray-300">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="flex-1 p-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your message..."
                  />
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    hidden
                  />
                  <label
                    htmlFor="imageInput"
                    hidden={message.length > 0}
                    type="submit"
                    className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {" "}
                    Image
                  </label>
                  <button
                    onClick={sendAdminMessage}
                    hidden={message.length === 0}
                    className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Send
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
