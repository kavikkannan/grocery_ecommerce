'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userId = 1; // Replace with actual user ID
                const response = await fetch(`http://localhost:9000/cart/${userId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);

                    // Calculate total amount
                    const total = data.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
                    setTotalAmount(total);
                } else {
                    console.error('Failed to fetch cart items, status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleCheckout = async () => {
        try {
            const userId = 1; // Replace with actual user ID
            const response = await fetch(`http://localhost:9000/orders/checkout/${userId}`, {
                method: 'POST',
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Order placed successfully! Order ID: ${data.order_id}`);
                router.push('/orders'); // Redirect to orders page
            } else {
                console.error('Failed to checkout, status:', response.status);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold text-black mb-5">Your Cart</h1>

            {cartItems.length > 0 ? (
                <div className="cart-items w-full max-w-2xl bg-white shadow-lg rounded-lg p-5">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item flex justify-between items-center border-b border-gray-200 py-3">
                            <div className="item-details">
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-600">Price: ${item.product.price.toFixed(2)}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="item-total text-right">
                                <p className="text-lg font-semibold">
                                    ${ (item.product.price * item.quantity).toFixed(2) }
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="total-amount flex justify-between items-center mt-5 pt-3 border-t border-gray-300">
                        <h2 className="text-xl font-bold">Total Amount</h2>
                        <p className="text-xl font-bold">${totalAmount.toFixed(2)}</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="checkout-button bg-blue-600 text-white w-full py-3 mt-5 rounded-lg hover:bg-blue-700"
                    >
                        Checkout
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            )}
        </div>
    );
}
