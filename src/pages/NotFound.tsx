
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route"
    );
  }, []);

  const getDashboardPath = () => {
    if (!isAuthenticated) return "/";
    
    return user?.role === 'admin' 
      ? '/admin' 
      : user?.role === 'counselor' 
        ? '/counselor' 
        : '/approver';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={() => navigate({ to: getDashboardPath() })}
          >
            <Home className="h-4 w-4 mr-2" />
            {isAuthenticated ? "Return to Dashboard" : "Return to Home"}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
