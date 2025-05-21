
import { createFileRoute } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/counselor')({
  component: CounselorLayout
})

function CounselorLayout() {
  const { user } = useAuthStore();
  
  // If user doesn't have counselor role, redirect to their respective dashboard
  if (user?.role !== 'counselor') {
    const redirectPath = user?.role === 'admin' 
      ? '/admin' 
      : '/approver';
    
    return <Navigate to={redirectPath} />
  }
  
  return <Outlet />
}
