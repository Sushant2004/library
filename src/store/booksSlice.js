// Redux slice for managing book data and state
// This slice handles all book-related state management including CRUD operations
import { createSlice } from '@reduxjs/toolkit';

// Create the books slice with reducers for managing book state
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
        rating: 4.5,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg"
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        description: "A powerful story of racial injustice and childhood innocence in the American South.",
        rating: 4.8,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-M.jpg"
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        category: "Sci-Fi",
        description: "A dystopian novel about totalitarian control and surveillance in a future society.",
        rating: 4.7,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg"
      },
      {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        description: "A fascinating exploration of how Homo sapiens came to dominate the world.",
        rating: 4.6,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg"
      },
      {
        id: 5,
        title: "Dune",
        author: "Frank Herbert",
        category: "Sci-Fi",
        description: "An epic science fiction novel set on the desert planet Arrakis.",
        rating: 4.9,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg"
      },
      {
        id: 6,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        category: "Fiction",
        description: "A coming-of-age story following teenager Holden Caulfield in New York City.",
        rating: 4.3,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780316769174-M.jpg"
      },
      {
        id: 7,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "Non-Fiction",
        description: "A groundbreaking work on human psychology and decision-making processes.",
        rating: 4.4,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780374533557-M.jpg"
      },
      {
        id: 8,
        title: "Foundation",
        author: "Isaac Asimov",
        category: "Sci-Fi",
        description: "The first book in Asimov's epic Foundation series about psychohistory.",
        rating: 4.5,
        coverImage: "https://covers.openlibrary.org/b/isbn/9780553293357-M.jpg"
      }
    ],
    categories: ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance", "Biography"]
  },
  reducers: {
    // Add a new book to the collection
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: Date.now(), // Simple ID generation
        rating: 0 // Default rating for new books
      };
      state.books = [newBook, ...state.books]; // Add to beginning of array using spread
    },
    // Update an existing book
    updateBook: (state, action) => {
      const { id, ...updatedBook } = action.payload;
      const index = state.books.findIndex(book => book.id === id);
      if (index !== -1) {
        state.books = state.books.map((book, i) => 
          i === index ? { ...book, ...updatedBook } : book
        );
      }
    },
    // Delete a book from the collection
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    }
  }
});

// Export actions and reducer
export const { addBook, updateBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;