import React from 'react';
import { DollarSign, Gift } from 'lucide-react';
import Footer from '../components/Footer';
import { Menu } from 'lucide-react';
import Header from '../components/Header';

function Transactions({ item, fullscreen }) {
  const className = fullscreen ? 'hidden' : 'flex mb-3';
  const w = !fullscreen ? 'hidden': 'flex flex-row items-center justify-between w-full'

  return (
    <div>
      <div className="p-3 bg-gray-900">
            <div className="flex flex-row items-center justify-between bg-gray-900">
                <div>
                    <img src="./logo.jpg" alt="Logo" className="w-10 h-10 rounded-full"/>
                </div>
                <div>
                    <p className='text-white text-2xl'>Forex Trading Forum</p>
                </div>
                <div>
                    <Menu color="white" size={24}/>
                </div>
            </div>
        </div>
      <div className='mb-10 bg-darkGreen min-h-screen flex flex-col items-center justify-center pb-20'>
            
            <div className={`flex justify-between items-center ${className}`}>
              <h6 className="text-lg font-semibold">Transaction</h6>
              <a href="#" className="text-sm text-blue-500 hover:underline">View all</a>
            </div>
            
            <div className="mb-4 w-full px-4 py-5">
              <div className="bg-gray-800 rounded-lg shadow-md w-full lg:w-2/3 xl:w-1/2 mx-auto">
                <div className="p-0">
                  <ul className="divide-y divide-gray-700">
                    <li className="flex items-center p-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center">
                        <DollarSign size={30} color='#777' />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-300 font-semibold">Deposit</p>
                        <p className="text-gray-400 text-sm">15-10-2021 | 10:20am</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white mb-0">-105.00</p>
                        <p className="text-white text-xs mt-1 bg-green-500 rounded-full px-2 py-1 inline-block">Success</p>
                      </div>
                    </li>
                    <li className="flex items-center p-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center">
                        <DollarSign size={30} color='#777' />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-300 font-semibold">Withdrawal</p>
                        <p className="text-gray-400 text-sm">15-10-2021 | 10:20am</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white mb-0">-105.00</p>
                        <p className="text-white text-xs mt-1 bg-red-500 rounded-full px-2 py-1 inline-block">Failed</p>
                      </div>
                    </li>
                    <li className="flex items-center p-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center">
                        <Gift size={30} color='#777' />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-300 font-semibold">Bonus</p>
                        <p className="text-gray-400 text-sm">15-10-2021 | 10:20am</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white mb-0">-105.00</p>
                        <p className="text-white text-xs mt-1 bg-yellow-500 rounded-full px-2 py-1 inline-block">Pending</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
    </div>
    
  );
}

export default Transactions;
