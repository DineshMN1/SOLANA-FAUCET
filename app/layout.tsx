import { Metadata } from "next";
import Link from "next/link";
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

function Footer() {
  return (
    <footer className="bg-black text-center py-4 mt-auto">
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
  );
}

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
          <Footer />
        </WalletContextProvider>
      </body>
    </html>
  );
}
