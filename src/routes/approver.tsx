
import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/approver')({
  component: ApproverLayout
})

function ApproverLayout() {
  const { user } = useAuthStore();
  
  // If user doesn't have approver role, redirect to their respective dashboard
  if (user?.role !== 'approver') {
    const redirectPath = user?.role === 'admin' 
      ? '/admin' 
      : '/counselor';
    
    return <Navigate to={redirectPath} />
  }
  
  return <Outlet />
}
