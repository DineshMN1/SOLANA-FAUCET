import { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

// Import fonts
const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMonoFont = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

// Dynamically import components (to prevent SSR issues)
const WalletContextProvider = dynamic(
  () => import("./contexts/WalletContextProvider"),
  { ssr: false, loading: () => <p>Loading Wallet...</p> }
);

const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });

const TransitionContextProvider = dynamic(
  () => import("./contexts/TransitionContextProvider"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Solana Faucet",
  description: "Get testnet SOL",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${robotoMonoFont.variable} antialiased bg-black text-white min-h-screen overflow-y-auto`}>

        <WalletContextProvider>
          <Navbar />
          <TransitionContextProvider>
            <main className="flex-grow flex flex-col items-center justify-center w-full">
              {children}
            </main>
          </TransitionContextProvider>
          <ToastContainer position="bottom-right" theme="dark" />
        </WalletContextProvider>
      </body>
    </html>
  );
}
