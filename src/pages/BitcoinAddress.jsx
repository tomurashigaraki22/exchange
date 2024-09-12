import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const BitcoinAddress = () => {
  const location = useLocation()
  const { amount, plan, email } = location.state || {};  
  const [addr, setAddr] = useState("1EByg3uCDg3Rep6jWPg8wwr9u3yjxCKhXA");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    const getDeets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getbtcaddr`, {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch the Bitcoin address");
        }
        const resp2 = await response.json();
        if (resp2.status === 200) {
          console.log("Reliant", resp2);
          setAddr(resp2.addr);
        } else {
          throw new Error("Failed to retrieve Bitcoin address");
        }
      } catch (error) {
        console.error("Error obtained: ", error);
      } finally {
        setLoading(false);
      }
    };

    getDeets();
  }, []);

  const btcUri = `bitcoin:${addr}?amount=${amount}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(addr)
      .then(() => {
        setCopied(true);
        toast.info("Success", {"type": 'default'})
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy address: ", err);
      });
  };

  if (loading) {
    return(
        <div className="flex flex-col items-center justify-center">
            <p>...Loading...</p>
        </div>
    );
  }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pb-20">
      <div className="text-center">
        <p className="text-xl text-white mb-7" style={{ fontFamily: 'Ubuntu' }}>
          Send Bitcoin to the following address:
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-white break-all bg-gray-800 p-2 rounded-md cursor-pointer" onClick={copyToClipboard}>
            {addr}
          </p>
          <button 
            onClick={copyToClipboard} 
            className="bg-darkgreen-600 hover:bg-darkgreen-700 text-white py-1 px-3 rounded-md transition duration-300 ease-in-out"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-3 mt-6">
        <div className="border-4 border-darkgreen-600 bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out rounded-lg p-4 shadow-lg">
          <QRCode value={btcUri} size={256} />
        </div>
        <p className="text-xl text-white mt-4" style={{ fontFamily: 'Josefin Sans'}}>
          Amount: {amount} BTC
        </p>
      </div>
    </div>
  );
};

export default BitcoinAddress;
