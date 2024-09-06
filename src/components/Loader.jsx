import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <div className="logo-wallet relative w-24 h-24 mx-auto">
          <div className="wallet-bottom bg-gray-600 w-full h-2 absolute bottom-0"></div>
          <div className="wallet-cards bg-gray-400 w-full h-2 absolute top-0"></div>
          <div className="wallet-top bg-gray-800 w-full h-20"></div>
        </div>
        <p className="mt-4">
          <span className="text-gray-400">Track finance with Wallet app</span>
          <br />
          <strong>Please wait...</strong>
        </p>
      </div>
    </div>
  );
}

export default Loader;
