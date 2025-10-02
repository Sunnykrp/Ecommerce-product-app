import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsArray, selectCartTotal, removeFromCart, updateQty, clearCart } from "../redux/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItemsArray);
    const total = useSelector(selectCartTotal);

    const handleQtyChange = (id, e) => {
        const qty = parseInt(e.target.value) || 1;
        dispatch(updateQty({ id, qty }));
    };

    const incrementQty = (id, currentQty) => {
        dispatch(updateQty({ id, qty: currentQty + 1 }));
    };

    const decrementQty = (id, currentQty) => {
        if (currentQty > 1) {
            dispatch(updateQty({ id, qty: currentQty - 1 }));
        }
    };

    if (cartItems.length === 0)
        return <p className="p-4 text-center text-gray-700">Your cart is empty.</p>;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="flex flex-col gap-4">
                {cartItems.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center justify-between border p-4 rounded-md">
                        <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.title} className="w-20 h-20 object-contain"/>
                            <div>
                                <h2 className="font-medium">{product.title}</h2>
                                <p className="text-gray-700">${product.price}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decrementQty(product.id, qty)}
                                className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 px-2 py-1 rounded-md font-bold"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={qty}
                                onChange={(e) => handleQtyChange(product.id, e)}
                                className="w-16 border rounded-md px-2 py-1 text-center"
                            />
                            <button
                                onClick={() => incrementQty(product.id, qty)}
                                className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 px-2 py-1 rounded-md font-bold"
                            >
                                +
                            </button>
                            <button
                                onClick={() => dispatch(removeFromCart(product.id))}
                                className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded-md hover:bg-red-600 ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-right">
                <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                <button
                    onClick={() => dispatch(clearCart())}
                    className="mt-2 bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default Cart;