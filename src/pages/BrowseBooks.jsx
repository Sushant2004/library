import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Star, Filter } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import './BrowseBooks.css';

const BrowseBooks = () => {
  const { books, categories } = useBooks();
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Filter books based on search term and category
  useEffect(() => {
    let filtered = books;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [books, selectedCategory, searchTerm]);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setSearchTerm(''); // Clear search when changing category
  };

  return (
    <div className="browse-books">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">
            {selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}
          </h1>
          <p className="page-subtitle">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <Filter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="category-select"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <div 
                  className="book-cover"
                  style={{
                    backgroundImage: `url(${book.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <div className="book-rating">
                    <Star className="star-icon filled" />
                    <span className="rating-value">{book.rating}</span>
                  </div>
                  <p className="book-category">{book.category}</p>
                  <p className="book-description">
                    {book.description.length > 100 
                      ? `${book.description.substring(0, 100)}...` 
                      : book.description
                    }
                  </p>
                  <Link to={`/book/${book.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-books">
            <div className="no-books-content">
              <h3>No books found</h3>
              <p>
                {searchTerm 
                  ? `No books match your search for "${searchTerm}"`
                  : `No books found in the ${selectedCategory} category`
                }
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooks;
