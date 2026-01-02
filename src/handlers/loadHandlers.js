import { fetchItems } from './apiHandlers';

export const loadItems = async (setItemsLoading, setItems) => {
  try {
    setItemsLoading(true);
    const response = await fetchItems();
    setItems(response.items);
  } catch (err) {
    console.error('Error loading items:', err);
  } finally {
    setItemsLoading(false);
  }
};