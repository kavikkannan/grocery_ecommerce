import { useState } from "react";

const ProductManagement = () => {
  // Example data for products (You would fetch this from a database in a real app)
  const categories = [
    {
      name: "Electronics",
      products: [
        { id: 1, name: "Smartphone", price: "$299" },
        { id: 2, name: "Laptop", price: "$899" },
      ],
    },
    {
      name: "Furniture",
      products: [
        { id: 3, name: "Sofa", price: "$499" },
        { id: 4, name: "Dining Table", price: "$399" },
      ],
    },
  ];

  const [products, setProducts] = useState(categories);

  // Handler for adding a product
  const addProduct = (categoryIndex) => {
    const newProduct = {
      id: Date.now(),
      name: `New Product ${Date.now()}`,
      price: "$0",
    };
    const updatedCategories = [...products];
    updatedCategories[categoryIndex].products.push(newProduct);
    setProducts(updatedCategories);
  };

  // Handler for editing a product
  const editProduct = (categoryIndex, productIndex) => {
    const updatedCategories = [...products];
    const product = updatedCategories[categoryIndex].products[productIndex];
    const newName = prompt("Edit product name:", product.name);
    const newPrice = prompt("Edit product price:", product.price);

    if (newName && newPrice) {
      product.name = newName;
      product.price = newPrice;
      setProducts(updatedCategories);
    }
  };

  // Handler for deleting a product
  const deleteProduct = (categoryIndex, productIndex) => {
    const updatedCategories = [...products];
    updatedCategories[categoryIndex].products.splice(productIndex, 1);
    setProducts(updatedCategories);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-8">Product Management</h1>

      {products.map((category, categoryIndex) => (
        <div key={category.name} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.products.map((product, productIndex) => (
              <div
                key={product.id}
                className="bg-black text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{product.price}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => editProduct(categoryIndex, productIndex)}
                    className="bg-green-400 text-black py-1 px-3 rounded hover:bg-green-500 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(categoryIndex, productIndex)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => addProduct(categoryIndex)}
            className="mt-4 bg-green-400 text-black py-2 px-4 rounded hover:bg-green-500 transition-colors"
          >
            Add Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductManagement;
