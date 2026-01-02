export const handleInputChange = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: name === 'price' ? parseFloat(value) || 0 : value
  }));
};

export const handleEditInputChange = (e, setEditFormData) => {
  const { name, value } = e.target;
  setEditFormData(prev => ({
    ...prev,
    [name]: name === 'price' ? parseFloat(value) || 0 : value
  }));
};

export const resetFormData = (setFormData) => {
  setFormData({
    name: '',
    price: 0,
    currency: 'USD',
    description: '',
    image_url: '',
    category: 'Shoe'
  });
};

export const resetEditFormData = (setEditFormData) => {
  setEditFormData({
    name: '',
    price: 0,
    currency: 'USD',
    description: '',
    image_url: '',
    category: 'Shoe'
  });
};