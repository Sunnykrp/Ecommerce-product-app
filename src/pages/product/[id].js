import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { fetchProductByID } from "../../utils/api";

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                setLoading(true);
                try {
                    const data = await fetchProductByID(id);
                    setProduct(data);
                } catch (err) {
                    setError("Failed to fetch product details");
                } finally {
                    setLoading(false);
                }
            };
            getProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) return <p className="p-4">Loading product...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;
    if (!product) return null;

    return (
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
            <img
                src={product.image}
                alt={product.title}
                className="w-full md:w-1/2 h-96 object-contain"
            />
            <div className="flex-1 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-xl font-semibold">${product.price}</p>
                
                {addedToCart && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                        ✅ Product added to cart!
                    </div>
                )}
                
                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;