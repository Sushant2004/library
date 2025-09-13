// Navigation header component with routing links
// This component provides the main navigation bar for the application
import { Link } from 'react-router-dom';
import { BookOpen, Home, Search, Plus } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and site title */}
        <Link to="/" className="logo">
          <BookOpen className="logo-icon" />
          <span className="site-title">Online Library</span>
        </Link>

        {/* Navigation menu */}
        <nav className="nav">
          <Link to="/" className="nav-link">
            <Home className="nav-icon" />
            Home
          </Link>
          <Link to="/browse" className="nav-link">
            <Search className="nav-icon" />
            Browse Books
          </Link>
          <Link to="/add-book" className="nav-link">
            <Plus className="nav-icon" />
            Add Book
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
