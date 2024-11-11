// components/CategoryPage.js
'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CategoryPage(Category) {
    const router = useRouter();
    const { category } = Category;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log()
    useEffect(() => {
        if (category) {
            fetchProductsByCategory(category);
        }
    }, [category]);

    const fetchProductsByCategory = async (category) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:9000/products/search/${category}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                setError("Failed to fetch products for the selected category.");
            }
        } catch (error) {
            setError("An error occurred while fetching products.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="category-page-container px-10 py-5">
            <h1 className="text-2xl font-semibold mb-4">Products in "{category}"</h1>
            <div className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                    <div key={product.id} className="product-card bg-white p-4 rounded-lg shadow-md">
                        <h2 className="product-name text-xl font-medium mb-2">{product.name}</h2>
                        <p className="product-description text-gray-700 mb-2">{product.description}</p>
                        <p className="product-price font-bold text-lg">${product.price.toFixed(2)}</p>
                        <p className="product-stock text-gray-500">Stock: {product.stock}</p>
                        <button
                            className="add-to-cart-button mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={() => alert(`Adding ${product.name} to cart`)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
