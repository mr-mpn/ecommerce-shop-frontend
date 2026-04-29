import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemCard, Navigation } from '../../components';
import { fetchItems } from '../../handlers';
import './HomePage.css';
import springStyle from '../../../assets/Spring-style.png'


const HomePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available categories
  const categories = ['All', 'Shoe', 'Clothing', 'Belts'];

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchItems();
        setItems(response.items);
        setFilteredItems(response.items); // Initially show all items
      } catch (err) {
        setError('Failed to load items. Please make sure the backend server is running.');
        console.error('Error loading items:', err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Filter items when category changes
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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchItems();
      setItems(response.items);
      setFilteredItems(response.items);
    } catch (err) {
      setError('Failed to load items. Please make sure the backend server is running.');
      console.error('Error loading items:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="items-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="items-container">
        <div className="error">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="items-container">
        <div className="empty-state">
          <h3>No items found</h3>
          <p>There are no items to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Bar on the top */}
      <Navigation />

      {/* Header banner right under nav */}
      <header className="items-header">
        <img src={springStyle} alt="" className="header-banner" />
      </header>

      <div className="items-container">
        
        {/* Category Filter */}
        <div className="filter-section">
          <div className="filter-container">
            <label htmlFor="category-filter" className="filter-label">
              Filter by Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-dropdown"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span className="results-count">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </span>
          </div>
        </div>
        
        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <h3>No items found in "{selectedCategory}" category</h3>
            <p>Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className="items-grid">
            {filteredItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;