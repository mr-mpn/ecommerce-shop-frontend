import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../../components';
import { 
  handleInputChange,
  handleEditInputChange,
  handleSubmit,
  handleUpdateSubmit,
  handleDelete,
  handleEdit,
  handleCancelEdit,
  loadItems
} from '../../handlers';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    currency: 'USD',
    description: '',
    image_url: '',
    category: 'Shoe'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemsLoading, setItemsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: 0,
    currency: 'USD',
    description: '',
    image_url: '',
    category: 'Shoe'
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  // Available categories - same as frontend
  const categories = ['Shoe', 'Clothing', 'Belts'];
  const filterCategories = ['All', 'Shoe', 'Clothing', 'Belts'];

  useEffect(() => {
    loadItems(setItemsLoading, setItems);
  }, []);

  // Filter items when category changes or items update
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => 
        item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory, items]);

  const handleCategoryFilterChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <Navigation />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Add new items to the catalog</p>
        </div>

        <div className="admin-form-container">
          <form 
            onSubmit={(e) => handleSubmit(e, formData, setLoading, setMessage, setFormData, setItems)} 
            className="admin-form"
          >
            <div className="form-group">
              <label htmlFor="name">Item Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                placeholder="Enter item name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Item Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                className="category-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={(e) => handleInputChange(e, setFormData)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image URL</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={(e) => handleInputChange(e, setFormData)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                rows={4}
                placeholder="Enter item description"
              />
            </div>

            {message && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Adding Item...' : 'Add Item'}
            </button>
          </form>

          {formData.image_url && (
            <div className="image-preview">
              <h3>Image Preview</h3>
              <img 
                src={formData.image_url} 
                alt="Preview"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={(e) => {
                  e.currentTarget.style.display = 'block';
                }}
              />
            </div>
          )}
        </div>

        <div className="admin-items-section">
          <div className="section-header">
            <h2>Manage Items</h2>
            
            {/* Filter Section */}
            <div className="admin-filter-section">
              <div className="admin-filter-container">
                <label htmlFor="admin-category-filter" className="filter-label">
                  Filter by Category:
                </label>
                <select
                  id="admin-category-filter"
                  value={selectedCategory}
                  onChange={handleCategoryFilterChange}
                  className="admin-category-dropdown"
                >
                  {filterCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="admin-results-count">
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                </span>
              </div>
            </div>
          </div>

          {itemsLoading ? (
            <div className="items-loading">
              <div className="spinner"></div>
              <p>Loading items...</p>
            </div>
          ) : (
            <div className="items-list">
              {filteredItems.length === 0 ? (
                <p className="no-items">
                  {selectedCategory === 'All' 
                    ? 'No items found.' 
                    : `No items found in "${selectedCategory}" category.`
                  }
                </p>
              ) : (
                filteredItems.map((item) => (
                  <div key={item._id} className="item-row">
                    <div className="item-image-small">
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">Name: {item.name}</h4>
                      <h4 className="item-category">Category: {item.category}</h4>
                      <p className="item-price">{item.price} {item.currency}</p>
                      <p className="item-description-short">{item.description.substring(0, 100)}...</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEdit(item, setEditingItem, setEditFormData)}
                        className="edit-button"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id, item.name, items, setDeleteLoading, setItems, setMessage)}
                        disabled={deleteLoading === item._id}
                        className="delete-button"
                      >
                        {deleteLoading === item._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <div className="modal-overlay" onClick={() => handleCancelEdit(setEditingItem, setEditFormData)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Update Item</h3>
                <button onClick={() => handleCancelEdit(setEditingItem, setEditFormData)} className="close-button">×</button>
              </div>
              
              <form 
                onSubmit={(e) => handleUpdateSubmit(e, editingItem, editFormData, setUpdateLoading, setMessage, setEditingItem, setItems)} 
                className="modal-form"
              >
                <div className="form-group">
                  <label htmlFor="edit-name">Item Name *</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editFormData.name}
                    onChange={(e) => handleEditInputChange(e, setEditFormData)}
                    required
                    placeholder="Enter item name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-category">Item Category *</label>
                  <select
                    id="edit-category"
                    name="category"
                    value={editFormData.category}
                    onChange={(e) => handleEditInputChange(e, setEditFormData)}
                    required
                    className="category-select"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="edit-price">Price *</label>
                    <input
                      type="number"
                      id="edit-price"
                      name="price"
                      value={editFormData.price}
                      onChange={(e) => handleEditInputChange(e, setEditFormData)}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="edit-currency">Currency</label>
                    <select
                      id="edit-currency"
                      name="currency"
                      value={editFormData.currency}
                      onChange={(e) => handleEditInputChange(e, setEditFormData)}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-image_url">Image URL</label>
                  <input
                    type="url"
                    id="edit-image_url"
                    name="image_url"
                    value={editFormData.image_url}
                    onChange={(e) => handleEditInputChange(e, setEditFormData)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-description">Description *</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editFormData.description}
                    onChange={(e) => handleEditInputChange(e, setEditFormData)}
                    required
                    rows={4}
                    placeholder="Enter item description"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={() => handleCancelEdit(setEditingItem, setEditFormData)} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" disabled={updateLoading} className="save-button">
                    {updateLoading ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>

              {editFormData.image_url && (
                <div className="modal-image-preview">
                  <h4>Image Preview</h4>
                  <img 
                    src={editFormData.image_url} 
                    alt="Preview"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = 'block';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;