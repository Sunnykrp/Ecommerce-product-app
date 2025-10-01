import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchProductByID } from "../../utils/api";

export default function ProductDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                try {
                    const data = await fetchProductByID(id);
                    setProduct(data);
                } catch (error) {
                    console.error("Failed to fetch product");
                } finally {
                    setLoading(false);
                }
            };
            getProduct();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-96 object-contain"/>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <button 
                onClick={() => alert("Added to cart!")} // Human-like simple solution first
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
}