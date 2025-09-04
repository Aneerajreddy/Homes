import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlatformProvider } from './context/PlatformContext';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertySearchPage from './pages/PropertySearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';

// Protected Pages
import TenantDashboard from './pages/tenant/TenantDashboard';
import BookingPage from './pages/tenant/BookingPage';
import ProfilePage from './pages/tenant/ProfilePage';
import FavoritesPage from './pages/tenant/FavoritesPage';
import BookingHistoryPage from './pages/tenant/BookingHistoryPage';

// Owner Pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AddPropertyPage from './pages/owner/AddPropertyPage';
import OwnerPropertiesPage from './pages/owner/OwnerPropertiesPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<PropertySearchPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />

          {/* Tenant Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <TenantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/booking/:propertyId" element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <BookingPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <FavoritesPage />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <BookingHistoryPage />
            </ProtectedRoute>
          } />

          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/owner/add-property" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <AddPropertyPage />
            </ProtectedRoute>
          } />
          <Route path="/owner/properties" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerPropertiesPage />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Redirect based on user role */}
          <Route path="/app" element={
            user ? (
              user.role === 'tenant' ? <Navigate to="/dashboard" /> :
              user.role === 'owner' ? <Navigate to="/owner/dashboard" /> :
              user.role === 'admin' ? <Navigate to="/admin/dashboard" /> :
              <Navigate to="/" />
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlatformProvider>
          <AppContent />
        </PlatformProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;