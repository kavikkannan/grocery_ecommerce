import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AddProducts = () => {
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




  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:9000/products", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("Product added successfully");
        setNewProduct({ name: "", category: "", price: "", stock: "", description: "" });
        fetchProducts(); 
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:9000/products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        alert("Product updated successfully");
        fetchProducts(); 
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const deleteProduct = async (id) => {
    
      try {
        const response = await fetch(`http://localhost:9000/products/remove/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        });
  
        if (response.ok) {
          alert("Order cancelled successfully!");
          fetchProducts(); // Refresh the orders after cancellation
        } else {
          console.error("Failed to cancel the order.");
        }
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    };

  return (
    <div className="flex h-screen text-black">
      <div className="flex-1 p-8 bg-orange-100 overflow-auto">
          <div>
            <h1 className="text-xl font-bold text-black mb-8">Add New Product</h1>
            <div className="space-y-4 w-[50%]">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full p-2 border rounded-xl"
              />
              <button
                onClick={handleAddProduct}
                className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600"
              >
                Add Product
              </button>
            </div>

            <h2 className="text-2xl font-bold mt-10">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {products.map((product) => (
                <div key={product.id} className="bg-orange-200   shadow-black p-6 rounded shadow-2xl">
                  

                 
                  <div className="flex justify-center items-center">
                  <img className="rounded-2xl h-[80%] w-[60%]" src={`/images/${product.name}.jpg`} alt={product.name} />

                  </div>
                  <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Description: {product.description}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => editProduct(product.id, { ...product, name: prompt("New name:", product.name) })}
                      className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>   
      </div>
    </div>
  );
};

export default AddProducts;
