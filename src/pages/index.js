import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearch, selectFilteredProducts } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredProducts);
    const status = useSelector(state => state.products.status);
    const error = useSelector(state => state.products.error);
    const search = useSelector(state => state.products.search);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleSearch = (e) => {
        dispatch(setSearch(e.target.value));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Products Grid */}
            {status === "loading" && <p>Loading products...</p>}
            {status === "failed" && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;