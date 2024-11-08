'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [products, setProducts] = useState({});
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {


                const response = await fetch("http://localhost:9000/products");
    
                if (response.ok) {
                    const data = await response.json();
                    // Group products by category
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
    
    const handleSeeMore = (category) => {
        // Redirect to detailed category page
        router.push(`/category/${category}`);
    };

    return (
        <div className="bg-orange-100  h-max-[300vh] w-full flex flex-col items-center gap-10">
            <div className="short_header h-10 w-[90%] flex justify-between text-black items-center">
                <div className="start h-10 text-sm flex gap-5">
                    <button className="border-2 rounded-2xl border-black p-2 bg-orange-200">
                        Products
                    </button>
                    <button>whats new</button>
                    <button>delivery</button>
                    <button>help and support</button>
                </div>

                <div className="end text-xm h-10 flex gap-5">
                    <button>track orders</button>
                    <button>faq</button>
                    <button className="flex gap-1 items-center">
                        <h1 className="h-6 w-6 rounded-full bg-orange-500"></h1>
                        <h1>Email Support</h1>
                    </button>
                </div>
            </div>
                {/* <div className="h-screen w-full flex justify-center ">
                    <div className="h-[50%] w-[70%] bg-white flex justify-between rounded-3xl text-black">
                        <div className="h-full w-[40%]  flex items-center justify-center">
                            <img className="rounded-2xl h-[80%] w-[60%]"  src="./images/fruits.jpg" alt="" />
                        </div>
                        <div className="h-full w-[60%] border-2 border-black rounded-3xl flex flex-col p-4">
                            <div className="flex items-center justify-center w-full"> 
                                product name
                            </div>
                            <div>
                                product description
                            </div>
                            <div>
                                ratings
                            </div>
                            <div>
                                stock available
                            </div>
                            <div>
                                <button>
                                    addtocart
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
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
                                    style={{
                                        backgroundImage: 'url(/images/fruits.jpg)',
                                    }}
                                    className="card h-[20vh] w-[20%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black"
                                >
                                    <h1 className="text-xl">{product.name}</h1>
                                    <h2 className="text-xs">${product.price.toFixed(2)}</h2>
                                </div>
                            ))}
                            {products[category].length > 4 && (
                                <button
                                    onClick={() => handleSeeMore(category)}
                                    className="see-more-button text-blue-500  text-sm bg-orange-200 shadow-2xl shadow-black rounded-2xl "
                                >
                                    <h1>
                                        See 
                                        <br />
                                        More
                                    </h1>
                                    <h1>
                                        {">"}
                                    </h1>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    );
}
