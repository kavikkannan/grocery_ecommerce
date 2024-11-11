import { useEffect, useState } from "react";

const AssignDeliveryPartner = () => {
  const [ordersByUser, setOrdersByUser] = useState({});
  const [deliveryPartner, setDeliveryPartner] = useState({});

  // Fetch all order IDs
  const fetchOrderIds = async () => {
    try {
      const response = await fetch("http://localhost:9000/orders");
      const data = await response.json();
      const orderDetails = await Promise.all(
        data.order_ids.map(async (orderId) => {
          const order = await fetchOrderById(orderId);
          const user = await fetchUserById(order?.order?.UserID);
          return { ...order, user };
        })
      );

      // Group orders by user ID
      const groupedOrders = orderDetails.reduce((acc, order) => {
        const userId = order.user.ID;
        if (!acc[userId]) {
          acc[userId] = { user: order.user, orders: [] };
        }
        acc[userId].orders.push(order);
        return acc;
      }, {});

      setOrdersByUser(groupedOrders);
    } catch (error) {
      console.error("Error fetching order IDs:", error);
    }
  };

  // Fetch order details by ID
  const fetchOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9000/orders/${orderId}`);
      const data = await response.json();
      // Ensure that `items` is always an array
      return { ...data, items: data.items || [] };
    } catch (error) {
      console.error("Error fetching order:", error);
      return { order: { items: [] } }; // Default object with an empty items array
    }
  };

  // Fetch user details by ID
  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/user/${userId}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      return { Name: "Unknown", ID: userId }; // Default user object in case of error
    }
  };

  // Assign delivery partner to order
  const handleAssignPartner = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:9000/orders/${orderId}/assign_delivery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          delivery_partner: deliveryPartner[orderId],
        }),
      });

      if (response.ok) {
        alert("Delivery partner assigned successfully!");
      } else {
        console.error("Failed to assign delivery partner.");
      }
    } catch (error) {
      console.error("Error assigning delivery partner:", error);
    }
  };

  // Handle input change for delivery partner
  const handleInputChange = (event, orderId) => {
    setDeliveryPartner({
      ...deliveryPartner,
      [orderId]: event.target.value,
    });
  };

  useEffect(() => {
    fetchOrderIds();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Assign Delivery Partner</h2>
      {Object.values(ordersByUser).map(({ user, orders }) => (
        <div key={user.ID} className="mb-8 border p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">User: {user.Name} (ID: {user.ID})</p>
          <div className="grid grid-cols-3">

          
          {orders.map((order) => (
            <div key={order.order.ID} className="mt-4 flex w-fit bg-orange-200 p-2 rounded-2xl">
                <div >
                <p>Order ID: {order.order.ID}</p>
              <p>Status: {order.order.Status}</p>
              <p>Total Amount: ${order.order.TotalAmount}</p>

              <h3 className="mt-4 font-semibold">Items:</h3>
              <ul className="list-disc pl-6">
                {(order.items || []).map((item, index) => (
                  <li key={index}>
                    Product ID: {item.product_id}, Quantity: {item.quantity}, Price: ${item.price}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  placeholder="Delivery Partner Name"
                  value={deliveryPartner[order.order.ID] || ""}
                  onChange={(event) => handleInputChange(event, order.order.ID)}
                  className="border px-4 py-2 rounded-2xl p-2 mr-4 "
                />
                <button
                  onClick={() => handleAssignPartner(order.order.ID)}
                  className="bg-orange-500 text-white px-4 py-2  hover:bg-orange-600 rounded-2xl"
                >
                  Assign Partner
                </button>
              </div>
              
                </div>
              

              
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignDeliveryPartner;
