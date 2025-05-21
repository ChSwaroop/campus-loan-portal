
import React from 'react';
import { Bell, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/hooks/use-toast';

const TopNav: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };
  
  return (
    <header className="bg-background border-b h-16 flex items-center px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu size={20} />
      </Button>
      
      <div className="flex-1 md:ml-4">
        <h2 className="text-lg font-semibold">
          {user?.role === 'admin' && 'Admin Dashboard'}
          {user?.role === 'counselor' && 'Counselor Dashboard'}
          {user?.role === 'approver' && 'Approver Dashboard'}
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut size={18} />
        </Button>
        
        <div className="hidden md:block">
          <div className="flex items-center">
            <div className="text-right mr-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
