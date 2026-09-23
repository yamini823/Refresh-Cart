import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import toast from "react-hot-toast";
import { Edit2, Trash2, Plus, Search, X, Loader } from "lucide-react";
import "./AdminDashboard.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Fruits & Vegetables",
    brand: "",
    price: "",
    oldPrice: "",
    offer: "",
    description: "",
    image: "",
    stock: 100,
  });

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Bakery",
    "Beverages",
    "Snacks & Munchies",
    "Grains & Masalas",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "oldPrice" || name === "stock" ? Number(value) : value,
    });
  };

  const openAddModal = () => {
    setEditMode(false);
    setSelectedProductId(null);
    setFormData({
      name: "",
      category: "Fruits & Vegetables",
      brand: "",
      price: "",
      oldPrice: "",
      offer: "",
      description: "",
      image: "",
      stock: 100,
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setSelectedProductId(product._id);
    setFormData({
      name: product.name || "",
      category: product.category || "Fruits & Vegetables",
      brand: product.brand || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      offer: product.offer || "",
      description: product.description || "",
      image: product.image || "",
      stock: product.stock || 100,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      toast.error("Name, price, and image URL are required!");
      return;
    }

    try {
      if (editMode) {
        // Update product
        await API.put(`/products/${selectedProductId}`, formData);
        toast.success("Product updated successfully! 🎉");
      } else {
        // Add product
        await API.post("/products", formData);
        toast.success("Product added successfully! 🍎");
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(editMode ? "Failed to update product" : "Failed to add product");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await API.delete(`/products/${id}`);
        toast.success("Product deleted successfully! 🗑️");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Product Management</h1>
            <p className="subtitle">View, add, edit, and delete store products</p>
          </div>
          <button className="add-btn" onClick={openAddModal}>
            <Plus size={18} /> Add Product
          </button>
        </header>

        {/* Filter controls */}
        <div className="table-actions-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products by name, category, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X size={16} className="clear-icon" onClick={() => setSearchQuery("")} />
            )}
          </div>
        </div>

        {loading ? (
          <div className="admin-loader">
            <Loader size={36} className="spin" />
            <p>Loading products list...</p>
          </div>
        ) : (
          <div className="dashboard-section-card">
            <div className="table-wrapper">
              {filteredProducts.length === 0 ? (
                <p className="no-data">No products found.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Info</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-table-img"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200";
                            }}
                          />
                        </td>
                        <td>
                          <div className="product-info-cell">
                            <span className="product-name">{product.name}</span>
                            <span className="product-brand">{product.brand || "No Brand"}</span>
                          </div>
                        </td>
                        <td>
                          <span className="category-badge">{product.category}</span>
                        </td>
                        <td>
                          <div className="price-cell">
                            <span className="curr-price">₹{product.price}</span>
                            {product.oldPrice && product.oldPrice > product.price && (
                              <span className="old-price">₹{product.oldPrice}</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`stock-text ${product.stock <= 10 ? "low-stock" : ""}`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td>
                          <div className="actions-cell">
                            <button
                              className="icon-btn edit-btn"
                              onClick={() => openEditModal(product)}
                              title="Edit product"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="icon-btn delete-btn"
                              onClick={() => handleDelete(product._id, product.name)}
                              title="Delete product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>{editMode ? "✏️ Edit Product" : "➕ Add New Product"}</h2>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Farm Fresh Red Apples"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Brand / Supplier</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g. Organic Farms"
                  />
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 120"
                    required
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Original Price (₹)</label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleInputChange}
                    placeholder="e.g. 150"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Offer Text</label>
                  <input
                    type="text"
                    name="offer"
                    value={formData.offer}
                    onChange={handleInputChange}
                    placeholder="e.g. 20% OFF"
                  />
                </div>

                <div className="form-group">
                  <label>Available Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="e.g. 100"
                    min="0"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Product Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter key details, nutritional info, ingredients..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editMode ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;