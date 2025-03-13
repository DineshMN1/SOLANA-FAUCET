"use client"
import { useState } from "react";

export default function SolanaFaucet() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("SOL");

  const handleSelect = (value) => {
    setSelectedValue(value);
    setShowDropdown(false);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-20">SOLANA FAUCET</h1>
      <div className="flex justify-center mt-12">
        <form action="" className="flex flex-col mt-22">
          <label htmlFor="" className="text-xl font-bold  ">Request SOL</label>
          <div className="relative flex items-center mt-3 border border-gray-300 rounded-md w-96">
            <input
              type="text"
              placeholder="Enter Your Wallet Address"
              className="w-full h-10 p-2 outline-none"
            />
            <button
              type="button"
              className=" px-4 py-2 border-l relative"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedValue}
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-12  border border-gray-300 shadow-md rounded-md w-28">
                {["1 SOL", "2 SOL", "5 SOL"].map((value) => (
                  <p
                    key={value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(value)}
                  >
                    {value}
                  </p>
                ))}
              </div>
            )}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-md mt-4">
            Airdrop SOL
          </button>
          <p className="text-center mt-5 text-gray-500">
            This faucet will be available for 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
