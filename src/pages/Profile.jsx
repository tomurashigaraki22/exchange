import { Menu } from "lucide-react";
import React, { useState } from "react";
import { FaHome, FaDollarSign, FaTasks, FaUser, FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Profile = () => {
    const [open, setOpen] = useState(false);

    const toggleNavbar = () => {
        setOpen(!open);
    };

    return (
        <div className={`pb-2 bg-black min-h-screen ${open ? 'blur-md' : ''}`}>
            <div className="flex flex-row items-center justify-between bg-gray-800 py-3 px-2 shadow-sm">
                <div className="flex flex-row items-center space-x-2">
                    <div>
                        <img src="./logo.png" alt="Logo" className="w-10 h-auto" />
                    </div>
                    <div>
                        <p className="text-white font-bold" style={{ fontFamily: 'Ubuntu' }}>Andrew G</p>
                    </div>
                </div>
                <div>
                    <Menu color="white" size={24} onClick={toggleNavbar} />
                </div>
            </div>

            {/* Navbar */}
            {open && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center text-white">
                    <div className="flex flex-col space-y-8">
                        <div className="flex items-center space-x-2">
                            <FaHome size={24} />
                            <p style={{ fontFamily: 'Ubuntu' }}>Home</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaDollarSign size={24} />
                            <p style={{ fontFamily: 'Ubuntu' }}>Invest</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaTasks size={24} />
                            <p style={{ fontFamily: 'Ubuntu' }}>Task</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUser size={24} />
                            <p style={{ fontFamily: 'Ubuntu' }}>Profile</p>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4">
                        <Menu color="white" size={24} onClick={toggleNavbar} />
                    </div>
                </div>
            )}

            <div className="p-3">
                <div className="rounded-lg pt-7 border border-black bg-gray-800 mt-10 p-4 flex flex-col items-center justify-center">
                    <div className="border-b border-gray-200 w-full pb-4 mb-6">
                        <p className="text-gray-100 text-xl font-bold" style={{ fontFamily: 'Ubuntu' }}>Profile</p>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="mb-6">
                            <img src="./profile-pic.jpg" alt="Profile Pic" className="w-24 h-24 rounded-full border-2 border-gray-300" />
                        </div>
                        <div className="text-center">
                            <p className="text-gray-100 text-lg font-bold" style={{ fontFamily: 'Ubuntu' }}>Andrew G</p>
                            <p className="text-gray-400" style={{ fontFamily: 'Ubuntu' }}>andrewg@example.com</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg pt-7 border border-black bg-gray-800 mt-10 p-4">
                    <div className="border-b border-gray-200 w-full pb-4 mb-6">
                        <p className="text-gray-100 text-lg font-bold" style={{ fontFamily: 'Ubuntu' }}>Connected Accounts</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-row items-center space-x-3">
                            <FaFacebook color="blue" size={24}/>
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>Facebook</p>
                        </div>
                        <div className="flex flex-row items-center space-x-3">
                            <FaXTwitter color="black" size={24}/>
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>Twitter</p>
                        </div>
                        <div className="flex flex-row items-center space-x-3">
                            <FaInstagram color="purple" size={24}/>
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>Instagram</p>
                        </div>
                        <div className="flex flex-row items-center space-x-3">
                            <FaLinkedin color="blue" size={24}/>
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>LinkedIn</p>
                        </div>
                        <div className="flex flex-row items-center space-x-3">
                            <FaYoutube color="red" size={24}/>
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>YouTube</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg pt-7 border border-black bg-gray-800 mt-10 p-4">
                    <div className="border-b border-gray-200 w-full pb-4 mb-6">
                        <p className="text-gray-100 text-lg font-bold" style={{ fontFamily: 'Ubuntu' }}>Settings</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>Change Password</p>
                            <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-800 hover:text-white transition duration-300">Change</button>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>Update Email</p>
                            <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-800 hover:text-white transition duration-300">Update</button>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-gray-100" style={{ fontFamily: 'Ubuntu' }}>Logout</p>
                            <button className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-800 hover:text-white transition duration-300">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
