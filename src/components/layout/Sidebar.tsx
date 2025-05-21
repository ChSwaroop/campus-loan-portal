
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { 
  ChevronRight, 
  Users, 
  FileText, 
  ClipboardCheck, 
  Settings,
  Home
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  // Define navigation items based on user role
  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { path: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
          { path: '/admin/users', label: 'User Management', icon: <Users size={20} /> },
          { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
        ];
      case 'counselor':
        return [
          { path: '/counselor', label: 'Dashboard', icon: <Home size={20} /> },
          { path: '/counselor/new-application', label: 'New Application', icon: <FileText size={20} /> },
          { path: '/counselor/applications', label: 'My Applications', icon: <ClipboardCheck size={20} /> },
        ];
      case 'approver':
        return [
          { path: '/approver', label: 'Dashboard', icon: <Home size={20} /> },
          { path: '/approver/pending', label: 'Pending Applications', icon: <FileText size={20} /> },
          { path: '/approver/reviewed', label: 'Reviewed Applications', icon: <ClipboardCheck size={20} /> },
        ];
      default:
        return [];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex flex-col flex-1">
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold">Edu-Loan Portal</h1>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md group transition-colors",
                isActive(item.path)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <ChevronRight size={16} className={cn(
                "opacity-0 transition-opacity",
                isActive(item.path) ? "opacity-100" : "group-hover:opacity-50"
              )} />
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded-full flex items-center justify-center">
            {user?.name.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
