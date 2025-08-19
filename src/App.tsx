import React, { useState } from 'react';
import { Home, Users, Package, Shield } from 'lucide-react';
import LandingPage from './components/LandingPage';
import TenantApp from './components/TenantApp';
import OwnerApp from './components/OwnerApp';
import FurnitureApp from './components/FurnitureApp';
import AdminApp from './components/AdminApp';
import { PlatformProvider } from './context/PlatformContext';

export type UserRole = 'tenant' | 'owner' | 'furniture' | 'admin' | null;

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const renderApp = () => {
    switch (currentRole) {
      case 'tenant':
        return <TenantApp onBack={() => setCurrentRole(null)} />;
      case 'owner':
        return <OwnerApp onBack={() => setCurrentRole(null)} />;
      case 'furniture':
        return <FurnitureApp onBack={() => setCurrentRole(null)} />;
      case 'admin':
        return <AdminApp onBack={() => setCurrentRole(null)} />;
      default:
        return <LandingPage onRoleSelect={setCurrentRole} />;
    }
  };

  return (
    <PlatformProvider>
      <div className="min-h-screen bg-gray-50">
        {renderApp()}
      </div>
    </PlatformProvider>
  );
}

export default App;