// Main App component with routing and state management
// This component sets up the React Router, Redux store, and error boundary
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './ErrorBoundary';
import Header from './components/Header';
import Home from './pages/Home';
import BrowseBooks from './pages/BrowseBooks';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseBooks />} />
              <Route path="/browse/:category" element={<BrowseBooks />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;