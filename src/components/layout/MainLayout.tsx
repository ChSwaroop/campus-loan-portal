
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface MainLayoutProps {
  requiredRole?: 'admin' | 'counselor' | 'approver' | 'any';
}

const MainLayout: React.FC<MainLayoutProps> = ({ requiredRole = 'any' }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated but on first login, redirect to password change
  if (user?.isFirstLogin) {
    return <Navigate to="/change-password" replace />;
  }
  
  // If requiredRole is specified and user doesn't have that role, redirect to their default page
  if (requiredRole !== 'any' && user?.role !== requiredRole) {
    const redirectPath = user?.role === 'admin' 
      ? '/admin' 
      : user?.role === 'counselor' 
        ? '/counselor' 
        : '/approver';
    
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
