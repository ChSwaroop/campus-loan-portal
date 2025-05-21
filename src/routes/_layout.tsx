
import { Outlet } from '@tanstack/react-router'
import TopNav from '../components/layout/TopNav'
import Sidebar from '../components/layout/Sidebar'
import { useAuthStore } from '../store/authStore'
import { Navigate } from '@tanstack/react-router'

const RootLayout = () => {
  const { user, isAuthenticated } = useAuthStore();
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  // If user is authenticated but on first login, redirect to password change
  if (user?.isFirstLogin) {
    return <Navigate to="/change-password" />
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
}

export default RootLayout
