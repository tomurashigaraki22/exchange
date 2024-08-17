import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { BiUser, BiCheckShield, BiMailSend, BiPhone, BiChat } from 'react-icons/bi';
import Modal from 'react-modal';
import Footer from '../components/Footer';

Modal.setAppElement('#root');

const Settings = () => {
    const [isUpdateAccountModalOpen, setUpdateAccountModalOpen] = useState(false);
    const [isModifyEmailModalOpen, setModifyEmailModalOpen] = useState(false);
    const [isLiveChatModalOpen, setLiveChatModalOpen] = useState(false);

    const openUpdateAccountModal = () => setUpdateAccountModalOpen(true);
    const closeUpdateAccountModal = () => setUpdateAccountModalOpen(false);

    const openModifyEmailModal = () => setModifyEmailModalOpen(true);
    const closeModifyEmailModal = () => setModifyEmailModalOpen(false);

    const openLiveChatModal = () => setLiveChatModalOpen(true);
    const closeLiveChatModal = () => setLiveChatModalOpen(false);

    const handleContactSupport = () => {
        window.location.href = 'mailto:emmanuelhudson355@gmail.com';
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
                            <button onClick={openUpdateAccountModal} className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left">
                                <BiUser size={24} className="text-blue-500 mr-3" />
                                <span className="text-white">Update Account Information</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={openModifyEmailModal} className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left">
                                <BiMailSend size={24} className="text-blue-500 mr-3" />
                                <span className="text-white">Modify Email</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleContactSupport} className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left">
                                <BiPhone size={24} className="text-blue-500 mr-3" />
                                <span className="text-white">Contact Support</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={openLiveChatModal} className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 w-full text-left">
                                <BiChat size={24} className="text-blue-500 mr-3" />
                                <span className="text-white">Live Chat</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
            <div className='fixed bottom-20 right-4 bg-gray-900 border-2 border-blue-500 rounded-full p-3 hover:bg-gray-400 transition duration-300 cursor-pointer' onClick={openLiveChatModal}>
                <BiChat color='blue' size={25} />
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
                    <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600" onClick={closeUpdateAccountModal}>Save</button>
                    <button className="ml-4 text-gray-500 hover:text-gray-300" onClick={closeUpdateAccountModal}>Cancel</button>
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
                    <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600" onClick={closeModifyEmailModal}>Save</button>
                    <button className="ml-4 text-gray-500 hover:text-gray-300" onClick={closeModifyEmailModal}>Cancel</button>
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
                    <div className="bg-gray-700 p-4 rounded-lg h-64 overflow-y-auto">
                        <p className="text-gray-300">You: Hello, I need help with my account.</p>
                        <p className="text-gray-300">Support: Sure, what seems to be the problem?</p>
                        {/* Add more chat messages here */}
                    </div>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="w-full p-2 mt-4 bg-gray-700 rounded-lg focus:outline-none"
                    />
                    <button className="bg-blue-500 px-4 py-2 mt-4 rounded-lg hover:bg-blue-600" onClick={closeLiveChatModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default Settings;
