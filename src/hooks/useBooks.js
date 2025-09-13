// Custom hook for safely accessing Redux book state
// This hook provides a clean interface for components to access book data
import { useSelector } from 'react-redux';

export const useBooks = () => {
  return useSelector(state => ({
    books: state.books.books || [],
    categories: state.books.categories || []
  }));
};
