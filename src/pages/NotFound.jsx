import { useLocation, Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="not-found">
      <div className="not-found-container">
        {/* Error Icon */}
        <div className="error-icon">
          <AlertCircle className="icon" />
        </div>

        {/* Error Content */}
        <div className="error-content">
          <h1 className="error-title">404 - Page Not Found</h1>
          <p className="error-message">
            Sorry, the page you're looking for doesn't exist.
          </p>
          
          {/* Display the invalid route */}
          <div className="invalid-route">
            <span className="route-label">Invalid URL:</span>
            <code className="route-url">{location.pathname}</code>
          </div>

          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="btn btn-primary">
              <Home className="btn-icon" />
              Go to Home
            </Link>
            <Link to="/browse" className="btn btn-secondary">
              Browse Books
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="element element-1"></div>
          <div className="element element-2"></div>
          <div className="element element-3"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
