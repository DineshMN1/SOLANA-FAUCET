"use client";

import * as React from 'react';
import  Link  from 'next/link';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import ExternalLinkIcon from "@heroicons/react/outline";
import * as web3 from '@solana/web3.js';

const Faucet = () => {
    // allocate state to hold transaction signature
    const [txSig, setTxSig] = React.useState<string>('');

    // get user info from wallet provider
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // function to send sol 
    const fundWallet = async (event: { preventDefault: () => void }) => {
        // prevent page from refreshing when this function runs
        event.preventDefault();

        // if user is not connected, throw an error
        if (!publicKey || !connection) {
            toast.error('Please connect your wallet');
            throw 'Please connect your wallet';
        }

        // generate a new keypair 
        const sender = web3.Keypair.generate();

        // check the balance of the keypair and send funds if needed
        const balance = await connection.getBalance(sender.publicKey);
        if (balance < web3.LAMPORTS_PER_SOL) {
            await connection.requestAirdrop(sender.publicKey, web3.LAMPORTS_PER_SOL * 1);
        }

        // create a new transaction and add the instruction to transfer tokens
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: publicKey,
                lamports: web3.LAMPORTS_PER_SOL * 1
            }),
        );

        // send the transaction to the network
        try {
            const signature = await sendTransaction(transaction, connection, {
                signers: [sender]
            });
            setTxSig(signature); // if tx lands, set state w/ tx signature
        } catch (error) {
            toast.error('Error funding wallet'); // if tx fails, throw error notification
            throw error;
        }
    };

    // format for outputs we want to render
    const outputs = [
        {
            title: 'Transaction Signature...',
            dependency: txSig,
            href: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`,
        }
    ];

    return (
        <>
            <main className='min-h-screen flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white'>
                <div className="flex flex-grow justify-center items-center">
                    <form onSubmit={event => fundWallet(event)} className='w-full max-w-lg rounded-lg bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                        <div className='flex flex-col sm:flex-row justify-between items-center'>
                            <h2 className='text-lg sm:text-2xl font-semibold text-center sm:text-left'>
                                Faucet 
                            </h2>
                            <button
                                type='submit'
                                className='mt-4 sm:mt-0 bg-violet-600 rounded-lg py-2 px-6 font-semibold transition-all duration-200 border-2 border-transparent hover:border-violet-900 disabled:opacity-50 disabled:hover:bg-[#fa6ece] hover:bg-transparent disabled:cursor-not-allowed'
                            >
                                Fund
                            </button>
                        </div>
                        
                        <div className='text-sm font-semibold mt-6 bg-[#222524] border-2 border-white rounded-lg p-4'>
                            <ul className='p-2'>
                                {outputs.map(({ title, dependency, href }, index) => (
                                    <li key={title} className={`flex flex-col sm:flex-row justify-between items-center text-center sm:text-left ${index !== 0 && 'mt-4'}`}>
                                        <p className='tracking-wider'>{title}</p>
                                        {dependency && (
                                            <a
                                                href={href}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='flex text-[#80ebff] italic hover:text-white transition-all duration-200'
                                            >
                                                {dependency.toString().slice(0, 25)}...
                                                <ExternalLinkIcon className='w-5 ml-1' />
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
    
            </main>
            
            <footer className="bg-black text-center py-4">
                <p className="text-sm text-gray-400">
                    Built with ❤️ by{" "}
                    <Link
                        href="https://github.com/DineshMN1"
                        className="text-gray-300 hover:text-gray-200 transition"
                    >
                        Dinesh MN
                    </Link>{" "}
                    | Get Devnet SOL
                </p>
            </footer>
        </>
    );
}
    
    export default Faucet;
    