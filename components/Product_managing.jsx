import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddProducts from "./addproduct";
import AssignDeliveryPartner from "./assigndeliverpartner";
import Analytics from "./analytics";
import CancleOrder from "./cancleorder";

const ProductManagement = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("addProducts");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

  // Add product handler
  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:9000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("Product added successfully");
        setNewProduct({ name: "", category: "", price: "", stock: "", description: "" });
        fetchProducts(); // Refresh product list
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Edit product handler
  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:9000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        alert("Product updated successfully");
        fetchProducts(); // Refresh product list
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete product handler
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully");
        fetchProducts(); // Refresh product list
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex h-screen text-black">
      {/* Sidebar */}
<div className="w-1/4 bg-gray-800 text-white p-6 shadow-lg min-h-screen">
  <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
  <ul className="space-y-4">
    <li
      className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        selectedOption === "addProducts" ? "bg-gray-600 text-white" : "hover:bg-gray-700 hover:text-white"
      }`}
      onClick={() => setSelectedOption("addProducts")}
    >
      Add Products
    </li>
    <li
      className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        selectedOption === "deliveryPartner" ? "bg-gray-600 text-white" : "hover:bg-gray-700 hover:text-white"
      }`}
      onClick={() => setSelectedOption("deliveryPartner")}
    >
      Assign Delivery Partner
    </li>
    <li
      className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        selectedOption === "analytics" ? "bg-gray-600 text-white" : "hover:bg-gray-700 hover:text-white"
      }`}
      onClick={() => setSelectedOption("analytics")}
    >
      Analytics
    </li>
    <li
      className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
        selectedOption === "cancelOrders" ? "bg-gray-600 text-white" : "hover:bg-gray-700 hover:text-white"
      }`}
      onClick={() => setSelectedOption("cancelOrders")}
    >
      Cancel Orders
    </li>
  </ul>
  <button
    onClick={handleLogout}
    className="mt-10 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
  >
    Logout
  </button>
</div>


      {/* Main Content */}
      <div className="flex-1 p-8 bg-orange-100 overflow-auto">
        {selectedOption === "addProducts" && (
          <AddProducts/>

        )}
        
        {selectedOption === "deliveryPartner" && (
          <AssignDeliveryPartner/>
        )}

        {selectedOption === "analytics" && (
          <Analytics/>
        )}
        {selectedOption === "cancelOrders" && (
          <CancleOrder/>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
