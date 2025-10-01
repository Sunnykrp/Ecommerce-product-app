import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="border border-gray-200 rounded-md p-4 hover:shadow-lg transition-shadow">
            <Link href={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-4"
                />
                <h2 className="font-medium text-gray-800">{product.title}</h2>
                <p className="mt-2 font-bold text-gray-900">${product.price}</p>
            </Link>
        </div>
    );
}