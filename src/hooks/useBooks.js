// Custom hook for safely accessing Redux book state
import { useSelector } from 'react-redux';

export const useBooks = () => {
  return useSelector(state => ({
    books: state.books.books || [],
    categories: state.books.categories || []
  }));
};
