const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to check if token is valid (not expired)
const isTokenValid = (token) => {
  if (!token) return false
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp > currentTime
  } catch {
    return false
  }
}

// Helper function to get auth headers with token validation
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  
  // Check if token exists and is valid before making API call
  if (!token || !isTokenValid(token)) {
    // Token is missing or expired - clear it and redirect to login
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    throw new Error('Authentication required. Please log in again.');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  return headers;
};

// Helper function to handle auth errors from backend
const handleAuthError = (response) => {
  if (response.status === 401) {
    // Backend rejected token - clear it and redirect to login
    console.log('Backend rejected token - redirecting to login');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    throw new Error('Authentication failed. Please log in again.');
  }
};

export const fetchItems = async () => {
  try {
    // fetchItems doesn't require authentication - it's public
    const response = await fetch(`${API_BASE_URL}/getItems`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const addNewItem = async (itemData) => {
  try {
    console.log('Adding new item - checking authentication...');
    const headers = getAuthHeaders(); // This will check token validity first
    
    console.log('Token valid, making API call to create item');
    const response = await fetch(`${API_BASE_URL}/newItem`, {
      method: 'POST',
      headers,
      body: JSON.stringify(itemData)
    });
    
    handleAuthError(response); // Handle backend auth rejection
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Item created successfully');
    return data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateItem = async (itemId, itemData) => {
  try {
    console.log('Updating item - checking authentication...');
    const headers = getAuthHeaders(); // This will check token validity first
    
    console.log('Token valid, making API call to update item');
    const response = await fetch(`${API_BASE_URL}/updateItem`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ id: itemId, ...itemData })
    });
    
    handleAuthError(response); // Handle backend auth rejection
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Item updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const removeItem = async (itemId) => {
  try {
    console.log('Deleting item - checking authentication...');
    const headers = getAuthHeaders(); // This will check token validity first
    
    console.log('Token valid, making API call to delete item');
    const response = await fetch(`${API_BASE_URL}/removeItem`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ id: itemId })
    });
    
    handleAuthError(response); // Handle backend auth rejection
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Item deleted successfully');
    return data;
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
};