'use client'
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orderIds, setOrderIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchOrderIds = async () => {
      try {
        const response = await fetch(`http://localhost:9000/ordersIds/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderIds(data.order_ids || []);
        } else {
          console.error("Failed to fetch order IDs, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching order IDs:", error);
      }
    };

    fetchOrderIds();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async (orderId) => {
      try {
        const response = await fetch(`http://localhost:9000/orders/${orderId}`);
        if (response.ok) {
          const data = await response.json();

          // Fetch tracking status
          const trackingResponse = await fetch(`http://localhost:9000/orders/${orderId}/track`);
          const trackingData = trackingResponse.ok ? await trackingResponse.json() : { status: "Tracking unavailable" };

          const itemsWithNames = await Promise.all(
            (data.items || []).map(async (item) => {  // Added fallback for empty items array
              const productResponse = await fetch(`http://localhost:9000/products/${item.product_id}`);
              if (productResponse.ok) {
                const productData = await productResponse.json();
                return { ...item, name: productData.Name };
              }
              return item;
            })
          );

          setOrders((prevOrders) => [
            ...prevOrders,
            { ...data.order, items: itemsWithNames, trackingStatus: trackingData.status },
          ]);
        } else {
          console.error("Failed to fetch order details, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderIds.length > 0) {
      orderIds.forEach((orderId) => fetchOrderDetails(orderId));
    }
  }, [orderIds]);

  if (error) {
    return <p>{error}</p>;
  }

  if (orders.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-orange-100 min-h-screen w-full flex flex-col items-center gap-10 p-6">
      <div className="short_header h-10 w-[90%] flex justify-between items-center text-black">
        <h1 className="text-2xl font-semibold">Orders Details</h1>
      </div>

      {orders.map((order, index) => (
        <div key={index} className="order-container h-fit w-[90%] py-5 flex flex-col gap-5 bg-white text-black rounded-2xl p-6 shadow-md">
          <div className="order-summary flex flex-col gap-3">
            <p><strong>Order ID:</strong> {order.ID}</p>
            <p><strong>User ID:</strong> {order.UserID}</p>
            <p><strong>Total Amount:</strong> ${order.TotalAmount.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.Status}</p>
            <p className='text-black'><strong>Tracking Status:</strong> {order.trackingStatus}</p>
          </div>

          <h2 className="text-xl font-semibold text-black mt-6">Order Items</h2>
          <div className="items-container flex flex-wrap gap-6">
            {order.items.map((item, itemIndex) => (
              <div key={itemIndex} className="item-card h-[20vh] w-[20%] bg-white rounded-2xl p-3 flex flex-col items-center text-black shadow-md">
                <p><strong>Product Name:</strong> {item.name || "Unknown"}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                <div className="h-[80%] w-full flex justify-center">
                  <img className="h-[80%]" src={`/images/${item.name}.jpg`} alt={item.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
