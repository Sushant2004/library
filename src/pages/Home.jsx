// Home page component displaying popular books and categories
// This is the landing page that showcases featured books and navigation
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import './Home.css';

const Home = () => {
  const { books, categories } = useBooks();

  // Get popular books (top rated books)
  const popularBooks = books
    .slice() // Create a copy to avoid mutation
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Online Library</h1>
          <p className="hero-subtitle">
            Discover thousands of books across various categories. 
            From classic literature to modern science fiction, 
            find your next great read with us.
          </p>
          <div className="hero-actions">
            <Link to="/browse" className="btn btn-primary">
              Browse Books
              <ArrowRight className="btn-icon" />
            </Link>
            <Link to="/add-book" className="btn btn-secondary">
              Add New Book
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Explore Categories</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category} 
                to={`/browse/${category.toLowerCase()}`}
                className="category-card"
              >
                <div className="category-icon">
                  {category === 'Fiction' && '📚'}
                  {category === 'Non-Fiction' && '📖'}
                  {category === 'Sci-Fi' && '🚀'}
                  {category === 'Mystery' && '🔍'}
                  {category === 'Romance' && '💕'}
                  {category === 'Biography' && '👤'}
                </div>
                <h3 className="category-name">{category}</h3>
                <p className="category-count">
                  {books.filter(book => book.category === category).length} books
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="popular-books">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Books</h2>
            <Link to="/browse" className="view-all-link">
              View All Books
              <ArrowRight className="link-icon" />
            </Link>
          </div>
          <div className="books-grid">
            {popularBooks.map(book => (
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
                  <Link to={`/book/${book.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;