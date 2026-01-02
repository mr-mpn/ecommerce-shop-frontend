import { addNewItem, updateItem, removeItem, fetchItems } from './apiHandlers';
import { resetFormData } from './formHandlers';

export const handleSubmit = async (
  e,
  formData,
  setLoading,
  setMessage,
  setFormData,
  setItems
) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);

  try {
    await addNewItem(formData);
    setMessage({ type: 'success', text: 'Item added successfully!' });
    resetFormData(setFormData);
    // Refresh the items list
    const response = await fetchItems();
    setItems(response.items);
  } catch (error) {
    console.error('Error adding item:', error);
    setMessage({ type: 'error', text: 'Failed to add item. Please try again.' });
  } finally {
    setLoading(false);
  }
};

export const handleUpdateSubmit = async (
  e,
  editingItem,
  editFormData,
  setUpdateLoading,
  setMessage,
  setEditingItem,
  setItems
) => {
  e.preventDefault();
  setUpdateLoading(true);

  try {
    await updateItem(editingItem._id, editFormData);
    // Refresh the items list from the server to get the latest data
    const response = await fetchItems();
    setItems(response.items);
    setMessage({ type: 'success', text: 'Item updated successfully!' });
    setEditingItem(null);
  } catch (error) {
    console.error('Error updating item:', error);
    setMessage({ type: 'error', text: 'Failed to update item. Please try again.' });
  } finally {
    setUpdateLoading(false);
  }
};

export const handleDelete = async (
  itemId,
  itemName,
  items,
  setDeleteLoading,
  setItems,
  setMessage
) => {
  if (!window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
    return;
  }

  setDeleteLoading(itemId);
  try {
    await removeItem(itemId);
    setItems(items.filter(item => item._id !== itemId));
    setMessage({ type: 'success', text: 'Item deleted successfully!' });
  } catch (error) {
    console.error('Error deleting item:', error);
    setMessage({ type: 'error', text: 'Failed to delete item. Please try again.' });
  } finally {
    setDeleteLoading(null);
  }
};