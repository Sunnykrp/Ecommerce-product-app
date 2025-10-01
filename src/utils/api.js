import axios from "axios";

// Fetch all products
export const fetchProductAPI = async () => {
    try {
        const res = await axios.get("https://fakestoreapi.com/products");
        console.log("Products response:", res.data); // Debug log - human-like
        return res.data;
    } catch (err) {
        console.log("Error in fetching products:", err);
        throw err;
    }
};

// Fetch product by id
export const fetchProductByID = async (id) => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        console.log(res.data); // Debug log
        return res.data;
    } catch (err) {
        console.log(`Error fetching product by id: ${id}`, err);
        throw err;
    }
};