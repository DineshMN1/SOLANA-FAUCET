"use client"
import React, { useState } from "react";
import Footer from "./Footer"; // Import Footer

const Faucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAirdrop = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTxHash("");

    try {
      const res = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress, amount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Airdrop failed");

      setTxHash(data.txHash);
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl absolute top-20 font-bold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent text-center">
          Solana Faucet
        </h1>

        {/* Form Card */}
        <div className="w-96 bg-black border border-gray-600 p-6 rounded-lg shadow-lg flex flex-col items-center mt-5">
          <form onSubmit={handleAirdrop} className="w-full flex flex-col items-center">
            <label className="text-xl font-bold mb-5">Request Airdrop</label>

            {/* Wallet Input + Dropdown in a Row */}
            <div className="flex w-full space-x-2">
              <input
                type="text"
                placeholder="Your Wallet Address..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="border p-2 w-full text-gray-300 border-gray-600 rounded focus:ring-1 focus:ring-gray-500 outline-none"
                required
              />

              {/* Small Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="border border-gray-600 px-3 py-2 text-sm text-white rounded bg-black flex items-center"
                >
                  Amount
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 w-24 bg-black border border-gray-600 rounded mt-1 shadow-lg transition-all duration-300 transform scale-95 origin-top-right">
                    {[0.5, 1, 2].map((amt) => (
                      <div
                        key={amt}
                        onClick={() => {
                          setAmount(amt);
                          setIsDropdownOpen(false);
                        }}
                        className="px-3 py-2 text-sm text-white cursor-pointer hover:bg-gray-800 transition duration-200"
                      >
                        {amt} SOL
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Airdrop Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-violet-400 text-black px-5 py-2 rounded w-full mt-3 hover:bg-violet-500 transition duration-300"
            >
              {loading ? "Airdropping..." : "Airdrop SOL"}
            </button>
          </form>
        </div>

        {/* Transaction Hash */}
        {txHash && (
          <p className="text-green-400 mt-3">
            ✅ Transaction:{" "}
            <a
              href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              View on Explorer
            </a>
          </p>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-3">❌ {error}</p>}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Faucet;
