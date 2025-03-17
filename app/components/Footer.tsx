import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-black text-center py-4 mt-auto">
            <p className="text-sm text-gray-400 dark:text-gray-500">
                Built with ❤️ by <Link href="https://github.com/DineshMN1" className="text-gray-300">Dinesh MN</Link> | Get Devnet SOL
            </p>
        </footer>
    );
}

export default Footer;
