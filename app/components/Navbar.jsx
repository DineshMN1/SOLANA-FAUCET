"use client";
import Link from 'next/link';
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full p-4 flex flex-wrap items-center justify-between bg-zinc-800 z-50">
            <div className="relative">
                <Link href="https://dineshmn.fyi" target='_blank' className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                    DINESH MN
                </Link>
            </div>

            <div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">SOL Faucet</h2>
            </div>

            <div className="mt-2 sm:mt-0">
                <WalletMultiButton className="!bg-helius-orange hover:!bg-black transition-all duration-200 !rounded-lg !px-3 !py-1 sm:!px-4 sm:!py-2" />
            </div>
        </nav>
    );
};

export default Navbar;
