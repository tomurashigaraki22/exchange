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
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
      } finally {
        setValue("");
      }
    };
    fetchMessages();
  }, []);
  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log("New message ===>", data);
      setMessageArray((prevMessages) => [...prevMessages, data]);
    };
    const newImage = (data) => {
      console.log(data);
      setMessageArray((prevMessages) => [...prevMessages, data]);
    };
    socket.on("newImage", newImage);
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newImage", newImage);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const sendMessage = async () => {
    if (value.length < 1) return;
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

  const handleImageChange = async (e) => {
    const email = localStorage.getItem("email");
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
            const response = await axios.post(`${BASE_URL}/upload_image`, {
              imageBase: base64String,
              senderEmail: email, // Include other necessary data
            });
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
      {isLiveChatModalOpen && (
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
                    Chat with SUpport
                  </span>
                </div>
                <button
                  onClick={() => {
                    setLiveChatModalOpen(false);
                  }}
                  className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Close
                </button>
              </header>

              <ul ref={messagesEndRef} className="flex-1 p-4 overflow-y-auto ">
                {messageArray.map((chat, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start mb-4 ${
                      chat.sender === "Support"
                        ? "justify-start"
                        : "justify-end"
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
                              {chat.sender}
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
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
                  hidden={value.length > 0}
                  type="submit"
                  className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {" "}
                  Image
                </label>
                <button
                  onClick={sendMessage}
                  hidden={value.length === 0}
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
  );
};

export default Settings;
