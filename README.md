# Online Library System

A modern, responsive web application built with React and Vite that allows users to browse, search, and manage a digital book collection. The application features a clean black and white design with intuitive navigation and comprehensive book management capabilities.


## 📦 Installation & Setup

### Prerequisites
Make sure you have Node.js (version 16 or higher) installed on your system.

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sushant2004/library
cd online-library-system
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 4: Build for Production
```bash
npm run build
```

### Step 5: Preview Production Build
```bash
npm run preview
```

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── Header.css      # Header styles
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Home.css        # Home page styles
│   ├── BrowseBooks.jsx # Book browsing page
│   ├── BrowseBooks.css # Browse page styles
│   ├── BookDetails.jsx # Individual book page
│   ├── BookDetails.css # Book details styles
│   ├── AddBook.jsx     # Add new book form
│   ├── AddBook.css     # Add book styles
│   ├── NotFound.jsx    # 404 error page
│   └── NotFound.css    # 404 page styles
├── store/              # Redux store
│   ├── index.js        # Store configuration
│   └── booksSlice.js   # Books state management
├── App.jsx             # Main app component
├── App.css             # Global app styles
├── main.jsx            # Application entry point
└── index.css           # Base styles and reset
```

## 📝 Development History

This project was developed with a focus on modern React practices and user experience:

- **Initial Setup**: React + Vite project structure
- **State Management**: Redux Toolkit for book data management
- **Routing**: React Router DOM for navigation
- **UI Components**: Custom components with Lucide React icons
- **Styling**: CSS with black and white theme
- **Image Handling**: Background images for perfect centering
- **Form Validation**: Client-side validation for book addition
- **Error Handling**: React Error Boundary for graceful error management

### 🚀 Key Features Implemented:
- **Home Page**: Popular books display with category navigation
- **Browse Books**: Search and filter functionality with dynamic routing
- **Book Details**: Comprehensive book information with related books
- **Add Book**: Form with image upload and validation
- **404 Page**: Custom error page for invalid routes
- **Responsive Design**: Mobile-friendly interface

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5173
npx kill-port 5173
# Then restart
npm run dev
```

**Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Clear build cache
npm run build -- --force
```

---

**Happy Reading! 📚**