import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Analytics = () => {
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);
  const [topItemsCount, setTopItemsCount] = useState(3);
  const [topProducts, setTopProducts] = useState([]);
  
  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Fetch analytics data from API
  const fetchAnalytics = async () => {
    try {
      const response = await fetch("http://localhost:9000/admin/dashboard");
      const data = await response.json();
      setAnalytics(data);
      fetchTopProducts(data.top_selling.slice(0, topItemsCount));
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  // Fetch product details for top-selling items
  const fetchTopProducts = async (topSelling) => {
    const products = await Promise.all(
      topSelling.map(async (item) => {
        const response = await fetch(`http://localhost:9000/products/${item.ProductID}`);
        const productData = await response.json();
        return { ...productData, totalSold: item.TotalSold };
      })
    );
    setTopProducts(products);
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/logout", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("isAdmin");
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex h-screen text-black w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
        {analytics ? (
          <div>
            <p className="text-lg">Active Users: <strong>{analytics.active_users}</strong></p>
            <p className="text-lg">Total Orders: <strong>{analytics.total_orders}</strong></p>

            <div className="mt-4">
              <label className="text-lg font-semibold mr-4">Top Selling Items:</label>
              <input
                type="number"
                value={topItemsCount}
                min="1"
                className="border p-1 rounded w-16"
                onChange={(e) => {
                  setTopItemsCount(e.target.value);
                  fetchTopProducts(analytics.top_selling.slice(0, e.target.value));
                }}
              />
            </div>

            <ul className="mt-4 list-disc pl-6">
              {topProducts.map((product, index) => (
                <li key={index} className="text-lg mb-4">
                  <div className="flex items-center">
                    <img
                      className="rounded-2xl h-20 w-20 mr-4"
                      src={`/images/${product.Name}.jpg`}
                      alt={product.Name}
                    />
                    <div>
                      <p><strong>{product.Name}</strong> ({product.Category})</p>
                      <p>Price: ${product.Price}</p>
                      <p>Total Sold: <strong>{product.totalSold}</strong></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading analytics...</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
