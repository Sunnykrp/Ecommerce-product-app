export default function Cart() {
    // Placeholder - will integrate with Redux later
    const cartItems = []; // Empty for now

    if (cartItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <p className="text-center text-gray-700">Your cart is empty.</p>
                <div className="text-center mt-4">
                    <a href="/" className="text-blue-600 hover:text-blue-800">
                        Continue Shopping
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {/* Will add cart items here when Redux is integrated */}
        </div>
    );
}