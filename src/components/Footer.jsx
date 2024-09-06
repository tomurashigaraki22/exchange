import React from 'react';
import { FaHome, FaWallet, FaArrowUp, FaArrowDown, FaEllipsisH } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Footer({ openModal }) {
    return (
        <footer className="footer bg-gray-800 text-white fixed bottom-0 w-full">
            <div className="container mx-auto">
                <ul className="flex justify-between p-4">
                    <li className="flex-1 text-center">
                        <Link className="text-white flex flex-col items-center" to="/home">
                            <FaHome size={20} />
                            <span className="text-xs">Dashboard</span>
                        </Link>
                    </li>
                    <li className="flex-1 text-center">
                        <Link className="text-white flex flex-col items-center" to="/earn">
                            <FaWallet size={20} />
                            <span className="text-xs">Tasks</span>
                        </Link>
                    </li>
                    <li className="flex-1 text-center">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-green-900 to-gray-900 p-2 rounded-full"
                            onClick={openModal}
                        >
                            <FaArrowUp size={25} />
                        </button>
                    </li>
                    <li className="flex-1 text-center">
                        <Link className="text-white flex flex-col items-center" to="/transactions">
                            <FaArrowDown size={20} />
                            <span className="text-xs">Transaction</span>
                        </Link>
                    </li>
                    <li className="flex-1 text-center">
                        <Link className="text-white flex flex-col items-center" to="/more">
                            <FaEllipsisH size={20} />
                            <span className="text-xs">More</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
