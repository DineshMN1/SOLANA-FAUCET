import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { address, amount } = await req.json();
  
      if (!address) {
        return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
      }
  
      const RPC_URL = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";
      const connection = new Connection(RPC_URL, "confirmed");
      const pubKey = new PublicKey(address);
  
      // Request Airdrop
      const txHash = await connection.requestAirdrop(pubKey, amount * LAMPORTS_PER_SOL);
      console.log("Airdrop Transaction Hash:", txHash);
  
      // Wait for confirmation
      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature: txHash,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });
  
      return NextResponse.json({ success: true, txHash }, { status: 200 });
  
    } catch (error:unknown) {
      console.error("Airdrop Error:", error);
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
      }
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  