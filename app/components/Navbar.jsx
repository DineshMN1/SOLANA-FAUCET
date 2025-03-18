"use client";
import LINK from 'next/link';
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <nav className='w-full p-4 flex justify-between items-center bg-zinc-800'>
            <div className="relative">
                <LINK href="https://dineshmn.fyi" target='_blank' className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent'>DINESH MN</LINK>
             </div>

             <div>
                <h2 className='text-2xl font-bold text-white'>SOL Faucet</h2>
             </div>
            
            
            <WalletMultiButton className='!bg-helius-orange hover:!bg-black transition-all duration-200 !rounded-lg' />
        </nav>
    );
};

export default Navbar;