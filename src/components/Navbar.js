import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCartCount } from '@/redux/cartSlice';

export default function Navbar() {
    const cartCount = useSelector(selectCartCount);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo / Brand */}
                    <Link href="/" className="text-xl font-bold text-gray-800">
                       🛒 E-commerce
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                            Dashboard
                        </Link>
                        <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
                            Cart
                            {isClient && cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}