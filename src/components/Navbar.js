import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-xl font-bold text-gray-800">
                        Ecom
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/cart" className="text-gray-700 hover:text-gray-900">
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}