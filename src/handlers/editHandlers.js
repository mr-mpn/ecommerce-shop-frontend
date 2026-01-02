import { resetEditFormData } from './formHandlers';

export const handleEdit = (item, setEditingItem, setEditFormData) => {
  setEditingItem(item);
  setEditFormData({
    name: item.name,
    price: item.price,
    currency: item.currency,
    description: item.description,
    image_url: item.image_url,
    category: item.category || '' // Add category field with fallback
  });
};

export const handleCancelEdit = (setEditingItem, setEditFormData) => {
  setEditingItem(null);
  resetEditFormData(setEditFormData);
};