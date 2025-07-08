
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    // Only redirect to password change if user is on first login
    if (user?.isFirstLogin) {
      return '/change-password';
    }
    
    // Return the appropriate dashboard path based on role
    return user?.role === 'admin' 
      ? '/admin' 
      : user?.role === 'counselor' 
        ? '/counselor' 
        : '/approver';
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md text-center mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">Edu-Loan Portal</h1>
          <p className="text-muted-foreground mt-2">
            Educational Loan Management System
          </p>
        </div>
        
        <div className="data-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Welcome to the Edu-Loan Portal</h2>
          <p className="text-muted-foreground mb-4">
            A comprehensive system for managing educational loans, streamlining the process from application to approval.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">You are logged in as <span className="font-medium">{user?.name}</span></p>
              <Button 
                className="w-full" 
                onClick={() => handleNavigation(getDashboardPath())}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={() => handleNavigation('/login')}
            >
              Sign In
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="data-card p-4">
            <h3 className="font-medium mb-2">Admin</h3>
            <p className="text-xs text-muted-foreground">User management & oversight</p>
          </div>
          <div className="data-card p-4">
            <h3 className="font-medium mb-2">Counselor</h3>
            <p className="text-xs text-muted-foreground">Application creation</p>
          </div>
          <div className="data-card p-4">
            <h3 className="font-medium mb-2">Approver</h3>
            <p className="text-xs text-muted-foreground">Loan review & decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
