import React, { useState } from 'react';

const DepositModal = ({ closeModal }) => {
    const [plan, setPlan] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const plans = {
        Standard: [100, 200, 300],
        Gold: [500, 800, 1000],
        Diamond: [1500, 2000, 3000],
        Emerald: [4000, 5000, 6000],
    };

    const paymentMethods = ['Cashapp', 'Zelle', 'Bitcoin', 'Apple Pay'];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end">
            <div className="bg-white w-full md:w-1/3 p-4 rounded-t-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Deposit Details</h2>
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">&times;</button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Choose a Plan</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                        >
                            <option value="">Select a plan</option>
                            {Object.keys(plans).map((plan) => (
                                <option key={plan} value={plan}>{plan}</option>
                            ))}
                        </select>
                    </div>
                    {plan && (
                        <div>
                            <label className="block text-gray-700">Enter an Amount</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            >
                                <option value="">Select an amount</option>
                                {plans[plan].map((amount) => (
                                    <option key={amount} value={amount}>{amount}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700">Select Payment Method</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Select a method</option>
                            {paymentMethods.map((method) => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Deposit</button>
                </form>
            </div>
        </div>
    );
};

export default DepositModal;
