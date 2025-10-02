import { useSelector } from 'react-redux';
import { useState } from 'react';
import DashboardCard from '@/components/DashboardCard';
import { selectCartCount, selectCartTotal } from '@/redux/cartSlice';

export default function Dashboard() {
    const products = useSelector(state => state.products.items);
    const cartCount = useSelector(selectCartCount);
    const cartTotal = useSelector(selectCartTotal);
    const [sortBy, setSortBy] = useState('name'); // 'name', 'price-asc', 'price-desc'

    // Sort products based on selected option
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name':
            default:
                return a.title.localeCompare(b.title);
        }
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <DashboardCard 
                    title="📊 Total Products" 
                    value={products.length}
                >
                    <p className="text-sm text-gray-500 mt-1">
                        Available in store
                    </p>
                </DashboardCard>

                <DashboardCard 
                    title="🛒 Total Items in Cart" 
                    value={cartCount}
                >
                    <p className="text-sm text-gray-500 mt-1">
                        Items added to cart
                    </p>
                </DashboardCard>

                <DashboardCard 
                    title="💰 Total Cart Value" 
                    value={`$${cartTotal.toFixed(2)}`}
                >
                    <p className="text-sm text-gray-500 mt-1">
                        Current cart total
                    </p>
                </DashboardCard>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Products Overview</h2>
                    
                    {/* Sorting Option */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="name">Name (A-Z)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No products available. Products will appear here once loaded.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img 
                                                src={product.image} 
                                                alt={product.title}
                                                className="h-12 w-12 object-contain"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                {product.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">⭐</span>
                                                {product.rating?.rate || 'N/A'}
                                                <span className="text-gray-500 text-xs ml-1">
                                                    ({product.rating?.count || 0})
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}