# Frontend JS - React + Vite

A React application with authentication, product catalog, and admin panel.

## Features

- **Authentication**: JWT-based login system with role-based access
- **Product Catalog**: Browse products with filtering and search
- **Admin Panel**: Protected admin interface for managing products
- **Offers Page**: Special offers and promotions
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- React 19 + Vite
- React Router DOM for routing
- Context API for state management
- JWT authentication
- ESLint for code quality

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Code linting

## Project Structure

```
src/
├── views/           # Page components
│   ├── HomePage/    # Product catalog
│   ├── AdminPanel/  # Admin interface
│   ├── Offers/      # Offers page
│   └── Login/       # Authentication
├── components/      # Reusable components
├── contexts/        # React contexts (Auth)
├── handlers/        # Business logic handlers
└── App.jsx         # Main app with routing
```

## Authentication

- JWT tokens stored in localStorage
- Protected routes for admin access
- Role-based permissions (admin/user)
- Automatic token validation and refresh