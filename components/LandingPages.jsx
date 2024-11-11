'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function Landing() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:9000/products");
                if (response.ok) {
                    const data = await response.json();
                    // Filter unique categories and set them to the state
                    const uniqueCategories = [...new Set(data.map(product => product.category))];
                    setCategories(uniqueCategories);
                } else {
                    console.error("Failed to fetch products, status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleViewTemplate = (category) => {
        router.push(`/category/${category}`);
    };

    return (
        <div className="bg-orange-100 h-screen w-full flex flex-col items-center gap-10">

            {/* Header Section */}
            <div className="short_header h-10 w-[90%] flex justify-between text-black items-center">
                <div className="start h-10 text-sm font-bold justify-center items-center flex gap-5">
                    <Link href={'/home'}>Products</Link>
                    <Link href={'/home'}>What's New</Link>
                    <Link href={'/home'}>Delivery</Link>
                    <Link href={'/home'}>Help and Support</Link>
                </div>
                <div className="end text-xm h-10 flex font-bold justify-center items-center  gap-5">
                    <Link href={'/orders'}>Track Orders</Link>
                    <Link href={'/'}>FAQ</Link>
                    <Link href={'/'} className="flex gap-1 items-center">
                        <h1 className="h-6 w-6 rounded-full bg-orange-500"></h1>
                        <h1>Email Support</h1>
                    </Link>
                </div>
            </div>

            {/* Landing Page Section */}
            <div className="temp1 h-[60%] w-[90%] rounded-2xl bg-cover shadow-2xl shadow-black" style={{ backgroundImage: 'url(/images/dark_red.jpg)' }}>
                <div className="info h-full w-full flex flex-col justify-center items-center">
                    <div className="h-[80%] w-[80%] z flex flex-col gap-2 justify-center items-center">
                        <div className="h-10 w-fit bg-red-700 flex gap-2 items-center rounded-3xl p-4">
                            <h1 className="h-6 w-6 rounded-full bg-white">i</h1>
                            <h1>Get free delivery on your first order</h1>
                        </div>
                        <div className="text-4xl font-bold flex gap-2">
                            <h1>We deliver</h1>
                            <h1 className="text-orange-500">groceries</h1>
                        </div>
                        <div className="text-3xl font-bold flex gap-2">
                            <h1>To your doorstep</h1>
                        </div>
                        <div>
                            <h1 className="text-xs">Get the freshest groceries delivered right to your home. Save time, skip the lines, and enjoy the convenience of quick, efficient delivery.</h1>
                        </div>
                        <div className="bg-orange-500 w-fit p-2 px-4 rounded-2xl">
                            <Link href={'/home'}>
                                <h1 className="text-xs">Shop Now {">"}</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="temp2 h-fit w-[90%] py-5 flex flex-col gap-3">
                <h1 className="text-xl text-black font-bold">Shop by Categories</h1>
                <div className="card h-[20vh] flex gap-6 ">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            style={{ backgroundImage: `url(/images/${category}.jpg)` }}
                            className="card1 h-full w-[30%] hover:-translate-y-2 hover:shadow-2xl shadow-orange-400 bg-cover rounded-2xl p-3 flex flex-col justify-start items-center text-black  "
                        >
                            <h1 className="text-xl font-bold">{category}</h1>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
