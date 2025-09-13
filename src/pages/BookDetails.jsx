import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, User } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import './BookDetails.css';

const BookDetails = () => {
  const { books } = useBooks();
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the book by ID
  const book = books.find(b => b.id === parseInt(id));

  // If book not found, redirect to browse page
  if (!book) {
    navigate('/browse');
    return null;
  }

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="book-details">
      <div className="container">
        {/* Back Button */}
        <div className="back-section">
          <button onClick={() => navigate('/browse')} className="back-btn">
            <ArrowLeft className="back-icon" />
            Back to Browse
          </button>
        </div>

        {/* Book Details Content */}
        <div className="book-content">
          {/* Book Cover */}
          <div className="book-cover-section">
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
          </div>

          {/* Book Information */}
          <div className="book-info-section">
            <div className="book-header">
              <h1 className="book-title">{book.title}</h1>
              <p className="book-author">
                <User className="author-icon" />
                by {book.author}
              </p>
            </div>

            <div className="book-meta">
              <div className="book-category">
                <span className="category-label">Category:</span>
                <span className="category-value">{book.category}</span>
              </div>
              
              <div className="book-rating">
                <span className="rating-label">Rating:</span>
                <div className="rating-display">
                  <div className="stars">
                    {renderStars(book.rating)}
                  </div>
                  <span className="rating-value">{book.rating}/5</span>
                </div>
              </div>
            </div>

            <div className="book-description">
              <h3 className="description-title">Description</h3>
              <p className="description-text">{book.description}</p>
            </div>

            <div className="book-actions">
              <Link to="/browse" className="btn btn-secondary">
                Browse More Books
              </Link>
              <Link to="/add-book" className="btn btn-primary">
                Add New Book
              </Link>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        <div className="related-books">
          <h2 className="related-title">More {book.category} Books</h2>
          <div className="related-grid">
            {books
              .filter(b => b.category === book.category && b.id !== book.id)
              .slice(0, 3)
              .map(relatedBook => (
                <Link 
                  key={relatedBook.id} 
                  to={`/book/${relatedBook.id}`}
                  className="related-book-card"
                >
                  <div 
                    className="related-cover"
                    style={{
                      backgroundImage: `url(${relatedBook.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                  </div>
                  <div className="related-info">
                    <h4 className="related-title-text">{relatedBook.title}</h4>
                    <p className="related-author">by {relatedBook.author}</p>
                    <div className="related-rating">
                      <Star className="star-icon filled" />
                      <span>{relatedBook.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
