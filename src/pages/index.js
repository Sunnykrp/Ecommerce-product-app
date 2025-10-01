import { useEffect, useState } from "react";
import { fetchProductAPI } from "../utils/api";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProductAPI();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4"/>
                        <h2 className="font-medium">{product.title}</h2>
                        <p className="mt-2 font-bold">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}