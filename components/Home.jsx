'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [products, setProducts] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const userId = sessionStorage.getItem("userId")

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:9000/products");
                if (response.ok) {
                    const data = await response.json();
                    const categorizedProducts = data.reduce((acc, product) => {
                        if (!acc[product.category]) acc[product.category] = [];
                        acc[product.category].push(product);
                        return acc;
                    }, {});
                    setProducts(categorizedProducts);
                } else {
                    console.error("Failed to fetch products, status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
    };

    const handleAddToCart = async () => {
        const payload = {
            user_id: userId,
            product_id: selectedProduct.id,
            quantity: quantity,
        };
        try {
            const response = await fetch("http://localhost:9000/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert("Product added to cart successfully");
                setSelectedProduct(null);
                setQuantity(1);
            } else {
                alert("Failed to add product to cart");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Error adding product to cart");
        }
    };

    const handleSeeMore = (category) => {
        router.push(`/category/${category}`);
    };

    return (
        <div className="bg-orange-100 h-max-[300vh] w-full flex flex-col items-center gap-10">
            <div className="short_header h-10 w-[90%] flex justify-between text-black items-center">
                {/* Header buttons here */}
            </div>

            <div className="product-container h-fit w-[90%] py-5 flex flex-col gap-5">
                {Object.keys(products).map((category) => (
                    <div key={category} className="category-section flex flex-col gap-3">
                        <div className="text">
                            <h1 className="text-xl text-black capitalize">{category}</h1>
                        </div>
                        <div className="card-container flex gap-6 justify-start">
                            {products[category].slice(0, 4).map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleCardClick(product)}
                                    className="card h-[20vh] w-[20%] bg-white rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black cursor-pointer"
                                >
                                    <h1 className="text-xl">{product.name}</h1>
                                    <h2 className="text-xs">${product.price.toFixed(2)}</h2>
                                    <div className="h-[80%] w-full flex justify-center">
                                        <img className="h-[80%]" src={`/images/${product.name}.jpg`} alt="" />
                                    </div>
                                </div>
                            ))}
                            {products[category].length > 4 && (
                                <button
                                    onClick={() => handleSeeMore(category)}
                                    className="see-more-button text-blue-500 text-sm bg-orange-200 shadow-2xl shadow-black rounded-2xl"
                                >
                                    <h1>See More</h1>
                                    <h1>{">"}</h1>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="h-[50%] w-[70%] bg-white flex justify-between rounded-3xl text-black p-8">
                        <div className="h-full w-[40%] flex items-center justify-center">
                            <img className="rounded-2xl h-[80%] w-[60%]" src={`/images/${selectedProduct.name}.jpg`} alt={selectedProduct.name} />
                        </div>
                        <div className="h-full w-[60%] border-2 border-black rounded-3xl flex flex-col p-4">
                            <div className="flex items-center justify-center w-full text-2xl font-semibold">
                                {selectedProduct.name}
                            </div>
                            <div className="my-2 text-lg">
                                {selectedProduct.description}
                            </div>
                            <div className="my-2 text-lg">
                                Ratings: 4.5 star
                            </div>
                            <div className="my-2 text-lg">
                                Stock: {selectedProduct.stock}
                            </div>
                            <div className="my-2 flex items-center gap-2">
                                <span>Quantity:</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="border rounded-md w-16 text-center"
                                />
                            </div>
                            <div className="my-2">
                                <button
                                    onClick={handleAddToCart}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-500">
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
