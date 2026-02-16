import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [products, setProducts] = useState([]);

  const [count, setCount] = useState(0);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  //load from local Storage
  useEffect(() => {
    const saved = localStorage.getItem("techProducts");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  //save to local storage when Product changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("techProducts", JSON.stringify(products));
    }
  }, [products]);

  //handle input CHnages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //handle images upload

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //create and update the product

  const handleSubmit = () => {
    if (!form.name || !form.price) return;

    if (editIndex != null) {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, form]);
      alert("PRoduct Added");
    }

    setForm({
      name: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      image: "",
    });
  };

  //Delete
  const handleDelete = (index) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  //Edit
  const handleEdit = (index) => {
    setForm(products[index]);
    setEditIndex(index);
  };
  return (
    <div className="app-container">
      <h2>Tech Store Project</h2>

      <div className="form-section">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />

        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <input type="file" onChange={handleImageUpload} />

        <button className="main-btn" onClick={handleSubmit}>
          {editIndex !== null ? "Update Product" : "Add Product"}
        </button>
      </div>

      <h3 className="list-title">Product List</h3>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            {product.image && <img src={product.image} alt="" />}

            <h4>{product.name}</h4>
            <p>₹ {product.price}</p>
            <p>{product.category}</p>
            <p>{product.brand}</p>
            <p>Stock: {product.stock}</p>

            <div className="counter">
              <button onClick={() => setCount(count + 1)}>+</button>
              <span>{count}</span>
              <button onClick={() => setCount(count - 1)}>-</button>
            </div>

            <div className="action-buttons">
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
