// Add Book page component with form validation and image upload
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../store/booksSlice';
import { BookOpen, User, FileText, Star } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import './AddBook.css';

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useBooks();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: 0,
    coverImage: ''
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          coverImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create book object with cover image
      const newBook = {
        ...formData,
        coverImage: formData.coverImage || `https://covers.openlibrary.org/b/isbn/9780000000000-M.jpg` // Use uploaded image or default
      };

      // Dispatch action to add book
      dispatch(addBook(newBook));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to browse page
      navigate('/browse');
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      category: '',
      description: '',
      rating: 0,
      coverImage: ''
    });
    setErrors({});
  };

  return (
    <div className="add-book">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Add New Book</h1>
          <p className="page-subtitle">
            Share your favorite book with the library community
          </p>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit} className="book-form">
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <BookOpen className="label-icon" />
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Enter the book title"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            {/* Author Field */}
            <div className="form-group">
              <label htmlFor="author" className="form-label">
                <User className="label-icon" />
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className={`form-input ${errors.author ? 'error' : ''}`}
                placeholder="Enter the author's name"
              />
              {errors.author && <span className="error-message">{errors.author}</span>}
            </div>

            {/* Category Field */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                <FileText className="label-icon" />
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`form-select ${errors.category ? 'error' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            {/* Description Field */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                <FileText className="label-icon" />
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Write a brief description of the book..."
                rows="4"
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            {/* Rating Field */}
            <div className="form-group">
              <label htmlFor="rating" className="form-label">
                <Star className="label-icon" />
                Rating (0-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className={`form-input ${errors.rating ? 'error' : ''}`}
                placeholder="Enter rating (0-5)"
                min="0"
                max="5"
                step="0.1"
              />
              {errors.rating && <span className="error-message">{errors.rating}</span>}
            </div>

            {/* Cover Image Upload Field */}
            <div className="form-group">
              <label htmlFor="coverImage" className="form-label">
                <FileText className="label-icon" />
                Book Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleFileUpload}
                className="form-file-input"
              />
              {formData.coverImage && (
                <div className="image-preview">
                  <img 
                    src={formData.coverImage} 
                    alt="Preview" 
                    className="preview-image"
                  />
                  <p className="preview-text">Cover Preview</p>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Book...' : 'Add Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
