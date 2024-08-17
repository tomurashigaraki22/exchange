import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DepositModal from "./components/DepositModal";
import { useAuth } from "../Context";
import TransactionPage from "./pages/Earn";
import Transactions from "./pages/Transactions";
import Admin from './pages/Admin'
import Settings from "./pages/Settings";
import BitcoinAddress from "./pages/BitcoinAddress";
import TestimoniesPage from './pages/Testimonies'

const AppNav = () => {
    const { authenticated, setauthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Router>
            {isModalOpen && <DepositModal closeModal={closeModal} />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/earn" element={<TransactionPage/>}/>
                <Route path="/transactions" element={<Transactions fullscreen={true}/>}/>
                <Route path="/home" element={<Home openModal={openModal} />} />
                <Route path="/more" element={<Settings/>}/>
                <Route path="/bitcoin" element={<BitcoinAddress/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/testimonies" element={<TestimoniesPage/>}/>
            </Routes>
        </Router>
    );
};

export default AppNav;
