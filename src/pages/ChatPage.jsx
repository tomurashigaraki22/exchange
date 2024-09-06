import { useState } from "react";
import { useLocation } from "react-router-dom";
const chats = [
  { sender: "Support", message: "How can we help you today" },
  { sender: "You", message: "I want to make a withdrawal" },
  { sender: "You", image: "/3.jpg" },
];
const SimpleChat = ({
  setIsChatModalOpen,
  setChats,
  setChatEmail,
  setIsChatReady,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const location = useLocation();
  const currentLocation = location.pathname;
  const [value, setValue] = useState("");
  return (
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
          <span className="text-lg font-semibold">Chat with test@mail.com</span>
        </div>
        <button
          onClick={() => {
            setIsChatModalOpen(false);
            setChatEmail("");
            setIsChatModalOpen(false);
            setIsChatReady(false);
            setChats([]);
          }}
          className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-500 transition duration-300"
        >
          Close
        </button>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {chats.map((chat, idx) => (
          <div
            key={idx}
            className={`flex items-start mb-4 ${
              /*  currentLocation !== "/admin" && chat.sender === "Support"
                ? "justify-start"
                : currentLocation == "/admin" && chat.sender == "Support"
                ? "justify-end"
                : currentLocation == "admin" && chat.sender !== "Support"
                ? "justify-end"
                : "justify-start" */
              "Edit this classname"
            }`}
          >
            {chat.sender === "Support" ? (
              <div className="flex items-start">
                <div className="ml-3 bg-gray-100 p-3 rounded-lg shadow-md">
                  <div className="text-sm font-semibold text-black">
                    Edit thus sender
                  </div>
                  <div className="mt-1 text-gray-700">{chat.message}</div>
                </div>
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
                    <div className="text-sm font-semibold text-black">You</div>
                    <div className="mt-1 text-gray-700">{chat.message}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </main>

      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 bg-gray-100 border-t border-gray-300"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your message..."
        />
        <input type="file" hidden />
        <button
          hidden={value.length > 0}
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {" "}
          Image
        </button>
        <button
          hidden={value.length === 0}
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default SimpleChat;
