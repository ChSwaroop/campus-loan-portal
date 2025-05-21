
import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: AdminLayout
})

function AdminLayout() {
  const { user } = useAuthStore();
  
  // If user doesn't have admin role, redirect to their respective dashboard
  if (user?.role !== 'admin') {
    const redirectPath = user?.role === 'counselor' 
      ? '/counselor' 
      : '/approver';
    
    return <Navigate to={redirectPath} />
  }
  
  return <Outlet />
}
