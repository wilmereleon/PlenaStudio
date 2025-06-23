# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (React + Vite + TypeScript)
- `npm install` - Install dependencies
- `npm run dev` - Start development server 
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build
- `npm start` - Alternative to dev server
- `npm test` - Run Jest tests

### Backend (Node.js + Express + TypeScript)
- `cd Backend && npm install` - Install backend dependencies
- Backend uses Express.js with TypeScript but no build scripts defined in package.json

## Architecture Overview

This is a full-stack e-commerce application for "Plena Studio" (jewelry/accessories store) with a clear separation between frontend and backend:

### Frontend Structure
- **React 19** with **TypeScript** and **Vite** as build tool
- **Bootstrap 5** for styling with Bootstrap Icons
- **React Router** for client-side routing
- **Context API** for state management (CartContext for shopping cart)
- Component-based architecture with separate directories for:
  - `src/components/` - Reusable UI components (Login, RegisterForm, Product cards, etc.)
  - `src/pages/` - Page-level components (product categories: Aretes, Anillos, Bufandas, etc.)
  - `src/context/` - React Context providers
  - `src/services/` - API communication layer
  - `src/hooks/` - Custom React hooks
  - `src/types/` - TypeScript type definitions

### Backend Structure  
- **Express.js** with **TypeScript**
- **MySQL** database with mysql2 driver
- **JWT** authentication with bcryptjs for password hashing
- **Layered architecture** following separation of concerns:
  - `src/api/` - Controllers and routes (auth, cart, catalog, contact, search)
  - `src/services/` - Business logic layer
  - `src/repositories/` - Data access layer
  - `src/models/` - Data models (User, Product, Order, Contact)
  - `src/middlewares/` - Express middlewares (auth)
  - `src/adapters/` - External service adapters (cache, email, notifications, payment)

### Key Features
- User authentication and registration
- Product catalog with categories (rings, earrings, bracelets, scarves, combinations)
- Shopping cart functionality
- Product search and filtering
- Contact form
- Order management

### Database
- Uses MySQL with dedicated SQL scripts in `script/` directory
- Includes comprehensive database diagrams and documentation in `Diagramas/` directory

### Testing
- Jest configured for frontend testing
- Test files located in `src/components/__tests__/`
- Tests include Login, RegisterForm, and ShoppingCart components

### Project Documentation
- Extensive UML diagrams and project documentation in `Diagramas/` directory
- Includes use case diagrams, sequence diagrams, class diagrams, deployment diagrams
- Both PNG and PlantUML source files available