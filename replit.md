# Overview

This is a comprehensive family property rental platform built with React and TypeScript on the frontend and Express.js with PostgreSQL on the backend. The platform serves multiple user types including tenants, property owners, furniture partners, and administrators. It facilitates property listings, tenant applications, furniture rental coordination, and platform administration through role-based applications.

The system is designed specifically for family rentals in India, featuring verified properties with complete furniture packages, automated furniture delivery coordination, and transparent rental processes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend uses React 18+ with TypeScript, built with Vite for fast development. State management is handled through React Context API with separate contexts for authentication (`AuthContext`) and platform data (`PlatformContext`). The application follows a multi-app architecture where different user roles access specialized interfaces:

- **Tenant App**: Property search, booking management, favorites
- **Owner App**: Property listing and management 
- **Furniture App**: Order and logistics management
- **Admin App**: Platform oversight and verification

Routing is managed by React Router v7 with protected routes that enforce role-based access control. The UI uses Tailwind CSS for styling with custom components and responsive design.

## Backend Architecture
The backend is built with Express.js following a layered architecture pattern:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and database operations using Drizzle ORM
- **Middleware**: Authentication, CORS, and request processing
- **Routes**: API endpoint definitions with role-based access

Authentication uses JWT tokens with bcrypt for password hashing. The API follows RESTful conventions with endpoints for users, properties, bookings, and furniture orders.

## Database Design
PostgreSQL database with Drizzle ORM for type-safe database operations. Key entities include:

- **Users**: Multi-role users (tenant, owner, admin) with profile data
- **Properties**: Property listings with verification status and amenities
- **Bookings**: Rental agreements between tenants and owners
- **Furniture Orders**: Automated furniture delivery coordination
- **Favorites**: User-saved properties for later consideration

The schema supports referential integrity with foreign key relationships and includes audit fields for tracking creation and updates.

## Authentication & Authorization
JWT-based authentication with role-based access control. Users are authenticated on login and receive tokens that include role information. Protected routes verify tokens and enforce role-specific access to different parts of the application.

Sample demo users are provided for each role with predefined credentials for testing and demonstration purposes.

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and schema management
- **@neondatabase/serverless**: Database connection pooling

## Authentication & Security
- **bcryptjs**: Password hashing and verification
- **jsonwebtoken**: JWT token generation and validation
- **cors**: Cross-origin resource sharing configuration

## Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety and enhanced development experience
- **ESLint**: Code linting and style enforcement
- **Tailwind CSS**: Utility-first CSS framework
- **Concurrently**: Running frontend and backend simultaneously

## UI Components
- **Lucide React**: Icon library for consistent iconography
- **React Router DOM**: Client-side routing and navigation

## Deployment
- **GitHub Pages**: Frontend deployment and hosting
- The backend is configured for deployment on various cloud platforms with environment variable configuration for database connections and JWT secrets.