import React, { useState, useRef } from "react";
import { Menu } from "lucide-react";
import {
  BiUser,
  BiCheckShield,
  BiMailSend,
  BiPhone,
  BiChat,
} from "react-icons/bi";
import Modal from "react-modal";
import Footer from "../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const Settings = ({ socket }) => {
  const socketRef = useRef(socket);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messageArray changes

  useEffect(() => {
    socketRef.current = socket; // Update the ref with the latest socket instance
  }, [socket]);
  const userId = localStorage.getItem("userId");
  const [isUpdateAccountModalOpen, setUpdateAccountModalOpen] = useState(false);
  const [isModifyEmailModalOpen, setModifyEmailModalOpen] = useState(false);
  const [isLiveChatModalOpen, setLiveChatModalOpen] = useState(false);
  const [messageArray, setMessageArray] = useState([]);
  const openUpdateAccountModal = () => setUpdateAccountModalOpen(true);
  const closeUpdateAccountModal = () => setUpdateAccountModalOpen(false);

  const openModifyEmailModal = () => setModifyEmailModalOpen(true);
  const closeModifyEmailModal = () => setModifyEmailModalOpen(false);

  const openLiveChatModal = () => setLiveChatModalOpen(true);
  const closeLiveChatModal = () => setLiveChatModalOpen(false);
  /* Find out why value is not changing */
  const [value, setValue] = useState("");

  const handleContactSupport = () => {
    window.location.href = "mailto:emmanuelhudson355@gmail.com";
  };
  const email = localStorage.getItem("email");
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/messages?userId=${userId}`
        );
        console.log(response);
        if (response.status === 200) {
          response.data.allMessages.forEach((message) => {
            setMessageArray((prevMessages) => [...prevMessages, message]);
          });
        }
      } catch (err) {
        if (err.status === 404) {
          console.log("User chats not found");
        } else {
          console.log(err);
        }
      }
    };
    fetchMessages();
  }, []);
  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log(data);
      setMessageArray((prevMessages) => [...prevMessages, data]);
    };

    socket.on("newUserMessage", handleNewMessage);

    // Cleanup function to remove the event listener
    return () => {
      socket.off("newUserMessage", handleNewMessage);
    };
  }, [socket]);
  const sendMessage = async () => {
    console.log({ email, value });
    try {
      const response = await axios.post(`${BASE_URL}/new_message`, {
        senderEmail: email,
        message: value,
      });
      if (response.status === 201) {
        setValue("");
      } else {
        toast.error("There was an error sending message", { theme: "dark" });
      }
    } catch (err) {
      toast.error("There was an error sending message", { theme: "dark" });
      console.log(err);
    }
  };
  useEffect(() => {
    if (isLiveChatModalOpen) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop =
            messagesEndRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [isLiveChatModalOpen, messageArray]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <Menu color="white" size={23} />
          </div>
          <div>
            <p className="text-lg font-bold">Settings</p>
          </div>
          <div>
            <img src="./logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
          </div>
        </div>
        <div className="mt-6 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            <li>
              <button
                onClick={openUpdateAccountModal}
                className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left"
              >
                <BiUser size={24} className="text-blue-500 mr-3" />
                <span className="text-white">Update Account Information</span>
              </button>
            </li>
            <li>
              <button
                onClick={openModifyEmailModal}
                className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left"
              >
                <BiMailSend size={24} className="text-blue-500 mr-3" />
                <span className="text-white">Modify Email</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleContactSupport}
                className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left"
              >
                <BiPhone size={24} className="text-blue-500 mr-3" />
                <span className="text-white">Contact Support</span>
              </button>
            </li>
            <li>
              <button
                onClick={openLiveChatModal}
                className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left"
              >
                <BiChat size={24} className="text-blue-500 mr-3" />
                <span className="text-white">Live Chat</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
      <div
        className="fixed bottom-20 right-4 bg-gray-900 border-2 border-blue-500 rounded-full p-3 hover:bg-gray-400 transition duration-300 cursor-pointer"
        onClick={openLiveChatModal}
      >
        <BiChat color="blue" size={25} />
      </div>

      {/* Update Account Modal */}
      <Modal
        isOpen={isUpdateAccountModalOpen}
        onRequestClose={closeUpdateAccountModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto text-white">
          <h2 className="text-lg font-bold mb-4">Change Password</h2>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg focus:outline-none"
          />
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={closeUpdateAccountModal}
          >
            Save
          </button>
          <button
            className="ml-4 text-gray-500 hover:text-gray-300"
            onClick={closeUpdateAccountModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Modify Email Modal */}
      <Modal
        isOpen={isModifyEmailModalOpen}
        onRequestClose={closeModifyEmailModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto text-white">
          <h2 className="text-lg font-bold mb-4">Change Email</h2>
          <input
            type="email"
            placeholder="New Email"
            className="w-full p-2 mb-4 bg-gray-700 rounded-lg focus:outline-none"
          />
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={closeModifyEmailModal}
          >
            Save
          </button>
          <button
            className="ml-4 text-gray-500 hover:text-gray-300"
            onClick={closeModifyEmailModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Live Chat Modal */}
      <Modal
        isOpen={isLiveChatModalOpen}
        onRequestClose={closeLiveChatModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto text-white">
          <h2 className="text-lg font-bold mb-4">Live Chat</h2>
          <div
            className="bg-gray-700 p-4 rounded-lg h-64 overflow-y-auto"
            ref={messagesEndRef}
          >
            {messageArray.length > 0 ? (
              messageArray.map((message, index) => (
                <p className="text-gray-300" key={index}>
                  {message.sender + ": " + message.message}
                </p>
              ))
            ) : (
              <p className="text-gray-300">
                Support: How can we help you today?
              </p>
            )}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 mt-4 bg-gray-700 rounded-lg focus:outline-none"
          />
          <div className="flex w-full justify-between items-center">
            <button
              className="bg-blue-500 px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
              onClick={closeLiveChatModal}
            >
              Close
            </button>
            <button
              className="bg-green-500 px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
