import dynamic from 'next/dynamic';

// Dynamically import the Faucet component with no SSR
const Faucet = dynamic(
  () => import('./components/Faucet'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <Faucet />
    </main>
  );
}